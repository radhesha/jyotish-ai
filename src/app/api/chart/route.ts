import { NextRequest, NextResponse } from "next/server";
import {
  julianDay, obliquity, lahiriAyanamsa, kpAyanamsa,
  ascendantDegree, localSiderealTime, placidusHouseCusps, kpHouseOf,
  allPlanetPositions, getNakshatra, getKPSubLord, signOf,
  getDivisionalSign, getD10Sign,
  vimshottariDasha, SIGNS,
} from "@/lib/ephemeris";
import type { ComputedChart, Planet, HouseCusp, VedicChart, KPChart, DivisionalChart, DivisionalPlanet } from "@/types";

interface ChartRequest {
  dob: string;
  tob: string;
  tobUnknown: boolean;
  city: string;
  country: string;
  name?: string;
  utcOffset?: number;  // decimal hours, e.g. 5.5 for IST
}

/** Geocode directly via Nominatim — no self-referential HTTP call */
async function geocode(city: string, country: string): Promise<{ lat: number; lng: number; display: string }> {
  const q   = encodeURIComponent(`${city}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "AstroAI/1.0 (contact@astroai.app)" },
    // 8-second timeout via AbortSignal
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json() as Array<{ lat: string; lon: string; display_name: string }>;
  if (!data.length) throw new Error(`Location not found: ${city}, ${country}`);
  return {
    lat:     parseFloat(data[0].lat),
    lng:     parseFloat(data[0].lon),
    display: data[0].display_name,
  };
}

// ── Divisional chart builder ──────────────────────────────────────────────────

interface RawVedicPlanet {
  name: string;
  sidereal: number;
}

/** Build one divisional chart from sidereal planet longitudes */
function buildDivisionalChart(
  division: number,
  chartName: string,
  ascSidereal: number,
  planets: RawVedicPlanet[],
  signFn: (deg: number) => number,
): DivisionalChart {
  const lagnaSignNum = signFn(ascSidereal);
  const lagnaSign    = SIGNS[lagnaSignNum - 1];

  const divPlanets: DivisionalPlanet[] = planets.map(p => {
    const sn    = signFn(p.sidereal);
    const sign  = SIGNS[sn - 1];
    const house = ((sn - lagnaSignNum + 12) % 12) + 1;
    return { name: p.name, signNum: sn, sign, house };
  });

  return {
    division,
    name:      chartName,
    ascendant: { signNum: lagnaSignNum, sign: lagnaSign },
    planets:   divPlanets,
  };
}

/** Convert local birth time to UT Julian Day.
 *  Uses the provided utcOffset (decimal hours) when available;
 *  falls back to a longitude-based approximation otherwise. */
function parseLocalTime(
  dob: string, tob: string, lng: number, utcOffset?: number
): { jd: number } {
  const [y, m, d] = dob.split("-").map(Number);
  const [h, min]  = tob ? tob.split(":").map(Number) : [12, 0];

  // Prefer the user-supplied offset; fall back to nearest whole hour from longitude
  const tzHours = utcOffset !== undefined ? utcOffset : Math.round(lng / 15);
  let   hourUT  = h + min / 60 - tzHours;
  let   day     = d, month = m, year = y;

  if (hourUT < 0)   { day -= 1; hourUT += 24; }
  if (hourUT >= 24) { day += 1; hourUT -= 24; }

  return { jd: julianDay(year, month, day, hourUT) };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChartRequest = await req.json();
    const { dob, tob, tobUnknown, city, country, name, utcOffset } = body;

    if (!dob || !city || !country) {
      return NextResponse.json({ error: "dob, city, country required" }, { status: 400 });
    }

    // 1. Geocode (direct Nominatim call)
    const geo = await geocode(city, country);
    const { lat, lng } = geo;

    // 2. Julian Day
    const tobStr = tobUnknown ? "" : (tob ?? "");
    const { jd } = parseLocalTime(dob, tobStr, lng, utcOffset);
    const obliq  = obliquity(jd);

    // 3. Planet positions (tropical)
    const rawPlanets = allPlanetPositions(jd);
    const lAyanamsa  = lahiriAyanamsa(jd);
    const kAyanamsa  = kpAyanamsa(jd);

    // 4. Ascendant
    const ramc        = localSiderealTime(jd, lng);
    const ascTropical = tobUnknown
      ? rawPlanets.find(p => p.name === "Sun")!.tropical   // fallback: Sun on horizon
      : ascendantDegree(ramc, obliq, lat);

    // ── VEDIC CHART (Lahiri ayanamsa, whole-sign houses) ─────────────────────

    const ascSidV    = ((ascTropical - lAyanamsa) % 360 + 360) % 360;
    const ascSignV   = signOf(ascSidV);
    const ascNakV    = getNakshatra(ascSidV);
    const lagnaNum   = ascSignV.signNum;

    const vedicPlanets: Planet[] = rawPlanets.map(p => {
      const sid  = ((p.tropical - lAyanamsa) % 360 + 360) % 360;
      const sn   = signOf(sid);
      const nak  = getNakshatra(sid);
      const house = ((sn.signNum - lagnaNum + 12) % 12) + 1;
      return {
        name: p.name,
        tropical:     +p.tropical.toFixed(4),
        sidereal:     +sid.toFixed(4),
        retrograde:   p.retrograde,
        nakshatra:    nak.nakshatra,
        nakshatraLord: nak.nakshatraLord,
        pada:         nak.pada,
        sign:         sn.sign,
        signNum:      sn.signNum,
        house,
      };
    });

    const vedicHouses = Array.from({ length: 12 }, (_, i) => {
      const signNum = ((lagnaNum - 1 + i) % 12) + 1;
      return { house: i + 1, sign: SIGNS[signNum - 1], signNum };
    });

    const moonSid  = vedicPlanets.find(p => p.name === "Moon")!.sidereal;
    const birthDate = new Date(dob + "T12:00:00Z");
    const dashas    = vimshottariDasha(moonSid, birthDate);

    // ── Divisional charts (Vargas) — computed from Vedic sidereal positions ────
    const rawForDiv: RawVedicPlanet[] = vedicPlanets.map(p => ({ name: p.name, sidereal: p.sidereal }));

    const divisional = {
      d2:  buildDivisionalChart(2,  "Hora (D-2)",            ascSidV, rawForDiv, d => getDivisionalSign(d, 2)),
      d3:  buildDivisionalChart(3,  "Drekkana (D-3)",        ascSidV, rawForDiv, d => getDivisionalSign(d, 3)),
      d4:  buildDivisionalChart(4,  "Chaturthamsha (D-4)",   ascSidV, rawForDiv, d => getDivisionalSign(d, 4)),
      d7:  buildDivisionalChart(7,  "Saptamsha (D-7)",       ascSidV, rawForDiv, d => getDivisionalSign(d, 7)),
      d9:  buildDivisionalChart(9,  "Navamsha (D-9)",        ascSidV, rawForDiv, d => getDivisionalSign(d, 9)),
      d10: buildDivisionalChart(10, "Dashamsha (D-10)",      ascSidV, rawForDiv, d => getD10Sign(d)),
      d12: buildDivisionalChart(12, "Dwadashamsha (D-12)",   ascSidV, rawForDiv, d => getDivisionalSign(d, 12)),
    };

    const vedicChart: VedicChart = {
      system:   "vedic",
      ayanamsa: +lAyanamsa.toFixed(4),
      ascendant: {
        degree:        +ascSidV.toFixed(4),
        sign:          ascSignV.sign,
        signNum:       ascSignV.signNum,
        nakshatra:     ascNakV.nakshatra,
        nakshatraLord: ascNakV.nakshatraLord,
        pada:          ascNakV.pada,
      },
      planets: vedicPlanets,
      houses:  vedicHouses,
      dashas,
      divisional,
    };

    // ── KP CHART (KP ayanamsa, Placidus cusps) ───────────────────────────────

    const ascSidK  = ((ascTropical - kAyanamsa) % 360 + 360) % 360;
    const ascSignK = signOf(ascSidK);
    const ascNakK  = getNakshatra(ascSidK);
    const ascSubK  = getKPSubLord(ascSidK);

    const tropicalCusps = tobUnknown
      ? Array.from({ length: 12 }, (_, i) => ((ascTropical + i * 30) % 360))
      : placidusHouseCusps(jd, lat, lng, obliq);

    const kpCusps: HouseCusp[] = tropicalCusps.map((cTrop, i) => {
      const sid = ((cTrop - kAyanamsa) % 360 + 360) % 360;
      const sn  = signOf(sid);
      const nak = getNakshatra(sid);
      return {
        house:         i + 1,
        degree:        +sid.toFixed(4),
        sign:          sn.sign,
        signNum:       sn.signNum,
        nakshatra:     nak.nakshatra,
        nakshatraLord: nak.nakshatraLord,
        subLord:       getKPSubLord(sid),
      };
    });

    const kpPlanets: Planet[] = rawPlanets.map(p => {
      const sid  = ((p.tropical - kAyanamsa) % 360 + 360) % 360;
      const sn   = signOf(sid);
      const nak  = getNakshatra(sid);
      return {
        name: p.name,
        tropical:      +p.tropical.toFixed(4),
        sidereal:      +sid.toFixed(4),
        retrograde:    p.retrograde,
        nakshatra:     nak.nakshatra,
        nakshatraLord: nak.nakshatraLord,
        pada:          nak.pada,
        sign:          sn.sign,
        signNum:       sn.signNum,
        house:         kpHouseOf(p.tropical, tropicalCusps),
      };
    });

    const kpChart: KPChart = {
      system:   "kp",
      ayanamsa: +kAyanamsa.toFixed(4),
      ascendant: {
        degree:        +ascSidK.toFixed(4),
        sign:          ascSignK.sign,
        signNum:       ascSignK.signNum,
        nakshatra:     ascNakK.nakshatra,
        nakshatraLord: ascNakK.nakshatraLord,
        subLord:       ascSubK,
        pada:          ascNakK.pada,
      },
      planets: kpPlanets,
      cusps:   kpCusps,
      dashas,
    };

    // ── Timezone label ────────────────────────────────────────────────────────
    const tzHours = Math.round(lng / 15);
    const tzLabel = `UTC${tzHours >= 0 ? "+" : ""}${tzHours}`;

    const result: ComputedChart = {
      vedic: vedicChart,
      kp:    kpChart,
      meta: {
        name:      name ?? "",
        dob,
        tob:       tobUnknown ? "Unknown" : (tob || "12:00"),
        city,
        country,
        lat:       +lat.toFixed(4),
        lng:       +lng.toFixed(4),
        timezone:  tzLabel,
        julianDay: +jd.toFixed(4),
      },
    };

    return NextResponse.json(result);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Chart API error:", msg);

    // Return user-friendly message for known failures
    if (msg.includes("Location not found") || msg.includes("not found")) {
      return NextResponse.json(
        { error: `We couldn't find "${(await req.json().catch(() => ({})) as { city?: string }).city}" — try a nearby larger city.` },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Chart computation failed. Please try again." }, { status: 500 });
  }
}
