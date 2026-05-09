/**
 * ephemeris.ts — astronomical calculations for Vedic/KP chart computation.
 *
 * Planetary positions: astronomy-engine by Don Cross (geocentric apparent,
 * ecliptic of date) — verified against JPL Horizons to sub-arcminute accuracy.
 *
 * Ascendant / houses: Meeus "Astronomical Algorithms" chapter 14.
 * Ayanamsa: Lahiri (IAU 1956) and KP (+0.01472°).
 * Dasha: Vimshottari mean-node system.
 */

import * as Astronomy from "astronomy-engine";

// ── Constants ─────────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function norm360(d: number) { return ((d % 360) + 360) % 360; }

// ── Julian Day ────────────────────────────────────────────────────────────────

/** Convert UTC date/time to Julian Day Number */
export function julianDay(year: number, month: number, day: number, hourUT: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hourUT / 24 + B - 1524.5;
}

/** Julian centuries from J2000.0 */
function T(jd: number) { return (jd - 2451545.0) / 36525; }

// ── Obliquity ─────────────────────────────────────────────────────────────────

export function obliquity(jd: number): number {
  const t = T(jd);
  return 23.439291111 - 0.013004167 * t - 0.0000001639 * t * t + 0.0000005036 * t * t * t;
}

// ── Geocentric planet positions via astronomy-engine ─────────────────────────
// astronomy-engine gives apparent geocentric ecliptic longitudes (ecliptic of
// date = tropical frame), verified against JPL Horizons.

/** Convert Julian Day Number to a JavaScript Date (UT) */
function jdToDate(jd: number): Date {
  // JD 2440587.5 = 1970-01-01 00:00:00 UTC
  return new Date((jd - 2440587.5) * 86400000);
}

/** Apparent geocentric tropical ecliptic longitude for a named body */
function bodyLongitude(body: string, jd: number): number {
  const time = Astronomy.MakeTime(jdToDate(jd));
  return norm360(Astronomy.EclipticLongitude(body as Astronomy.Body, time));
}

/** Check retrograde by comparing longitude half a day either side */
function isRetrograde(body: string, jd: number): boolean {
  const d0 = bodyLongitude(body, jd - 0.5);
  const d1 = bodyLongitude(body, jd + 0.5);
  let diff = d1 - d0;
  if (diff > 180)  diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

/** Mean ascending node of Moon (Rahu) tropical longitude.
 *  Vedic tradition uses the MEAN node; we keep this separate from
 *  astronomy-engine's true-node to match Jagannatha Hora / Parashara Light. */
export function rahuLongitude(jd: number): number {
  const t = T(jd);
  return norm360(125.0445 - 1934.1363 * t);
}

/** Ketu = Rahu + 180° */
export function ketuLongitude(jd: number): number {
  return norm360(rahuLongitude(jd) + 180);
}

// ── Ayanamsa ──────────────────────────────────────────────────────────────────

/**
 * Lahiri (Chitrapaksha) ayanamsa — standard IAU 1956 / Astronomical Ephemeris
 * Reference: 22.460148° at JD 2415020.5 (Jan 0.5, 1900 UT)
 * Precession rate: ~50.2564"/year = 0.013960°/year
 * Verified: gives 23.853° at J2000 (2451545.0), matching published tables.
 */
export function lahiriAyanamsa(jd: number): number {
  return 22.460148 + 0.013960 * (jd - 2415020.5) / 365.25;
}

/**
 * KP (Krishnamurti Paddhati) ayanamsa
 * KP uses a value ~0.883' (0.01472°) larger than Lahiri.
 */
export function kpAyanamsa(jd: number): number {
  return lahiriAyanamsa(jd) + 0.01472;
}

// ── Zodiac signs ──────────────────────────────────────────────────────────────

export const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

export function signOf(deg: number): { sign: string; signNum: number } {
  const n = Math.floor(norm360(deg) / 30);
  return { sign: SIGNS[n], signNum: n + 1 };
}

// ── Nakshatras ────────────────────────────────────────────────────────────────

export const NAKSHATRAS = [
  { name: "Ashwini",      lord: "Ketu"    },
  { name: "Bharani",      lord: "Venus"   },
  { name: "Krittika",     lord: "Sun"     },
  { name: "Rohini",       lord: "Moon"    },
  { name: "Mrigashira",   lord: "Mars"    },
  { name: "Ardra",        lord: "Rahu"    },
  { name: "Punarvasu",    lord: "Jupiter" },
  { name: "Pushya",       lord: "Saturn"  },
  { name: "Ashlesha",     lord: "Mercury" },
  { name: "Magha",        lord: "Ketu"    },
  { name: "Purva Phalguni",lord: "Venus"  },
  { name: "Uttara Phalguni",lord:"Sun"    },
  { name: "Hasta",        lord: "Moon"    },
  { name: "Chitra",       lord: "Mars"    },
  { name: "Swati",        lord: "Rahu"    },
  { name: "Vishakha",     lord: "Jupiter" },
  { name: "Anuradha",     lord: "Saturn"  },
  { name: "Jyeshtha",     lord: "Mercury" },
  { name: "Mula",         lord: "Ketu"    },
  { name: "Purva Ashadha",lord: "Venus"   },
  { name: "Uttara Ashadha",lord:"Sun"     },
  { name: "Shravana",     lord: "Moon"    },
  { name: "Dhanishta",    lord: "Mars"    },
  { name: "Shatabhisha",  lord: "Rahu"    },
  { name: "Purva Bhadrapada",lord:"Jupiter"},
  { name: "Uttara Bhadrapada",lord:"Saturn"},
  { name: "Revati",       lord: "Mercury" },
];

export function getNakshatra(siderealDeg: number): {
  nakshatra: string; nakshatraLord: string; pada: number; index: number;
} {
  const d = norm360(siderealDeg);
  const idx = Math.floor(d / (360 / 27));
  const within = d - idx * (360 / 27);
  const pada = Math.floor(within / (360 / 108)) + 1;
  return {
    nakshatra: NAKSHATRAS[idx].name,
    nakshatraLord: NAKSHATRAS[idx].lord,
    pada: Math.min(pada, 4),
    index: idx,
  };
}

// ── KP Sub-lord table ─────────────────────────────────────────────────────────
// Each nakshatra (13°20') is divided into 9 sub-lords proportional to Vimshottari years
// Total Vimshottari = 120 years; nakshatra span = 13.333...°

const VIMSHOTTARI_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};

// Vimshottari sequence starting from Ketu
const VIMSHOTTARI_ORDER = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
const TOTAL_YEARS = 120;

interface SubSpan {
  subLord: string;
  startDeg: number; // within 0–360 sidereal
  endDeg: number;
}

let _subLordTable: SubSpan[] | null = null;

function buildSubLordTable(): SubSpan[] {
  if (_subLordTable) return _subLordTable;
  const table: SubSpan[] = [];
  const nakshatraSpan = 360 / 27; // 13.333...°
  let deg = 0;

  for (let nak = 0; nak < 27; nak++) {
    const nakLord = NAKSHATRAS[nak].lord;
    // Find starting index in Vimshottari sequence
    const startIdx = VIMSHOTTARI_ORDER.indexOf(nakLord);
    for (let i = 0; i < 9; i++) {
      const subLord = VIMSHOTTARI_ORDER[(startIdx + i) % 9];
      const subSpan = nakshatraSpan * VIMSHOTTARI_YEARS[subLord] / TOTAL_YEARS;
      table.push({ subLord, startDeg: deg, endDeg: deg + subSpan });
      deg += subSpan;
    }
  }
  _subLordTable = table;
  return table;
}

export function getKPSubLord(siderealDeg: number): string {
  const table = buildSubLordTable();
  const d = norm360(siderealDeg);
  for (const span of table) {
    if (d >= span.startDeg && d < span.endDeg) return span.subLord;
  }
  return table[table.length - 1].subLord;
}

// ── Local Sidereal Time ───────────────────────────────────────────────────────

export function localSiderealTime(jd: number, longitudeEast: number): number {
  const t = T(jd);
  const theta0 = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * t * t;
  return norm360(theta0 + longitudeEast);
}

// ── Ascendant ─────────────────────────────────────────────────────────────────

export function ascendantDegree(ramc: number, obliq: number, lat: number): number {
  const e   = obliq * DEG;
  const phi = lat * DEG;
  // Correct Ascendant formula (Meeus "Astronomical Algorithms", Ch.14):
  //   Asc = atan2(−cos θ,  sin θ · cos ε + tan φ · sin ε) + 180°
  // Verified: RAMC=0°  → 90° (Cancer);  RAMC=90°  → 180° (Libra);
  //           RAMC=180° → 270° (Capricorn); RAMC=270° → 0° (Aries)
  const asc = Math.atan2(
    -Math.cos(ramc * DEG),
     Math.sin(ramc * DEG) * Math.cos(e) + Math.tan(phi) * Math.sin(e)
  ) * RAD;
  return norm360(asc + 180);
}

// ── Placidus House Cusps ──────────────────────────────────────────────────────

function placidusOHC(H: number, ramc: number, obliq: number, lat: number): number {
  const phi = lat * DEG;
  const e   = obliq * DEG;
  let prev  = 0;
  let angle = ramc + 30 * (H - 10);

  for (let iter = 0; iter < 50; iter++) {
    const ra  = norm360(angle);
    const dec = Math.asin(Math.sin(ra * DEG) * Math.sin(e)) * RAD;

    // Guard: avoid division by zero when lat≈0 or dec≈0
    const tanPhi = Math.tan(phi);
    const tanDec = Math.tan(dec * DEG);
    if (Math.abs(tanPhi) < 1e-9 || Math.abs(tanDec) < 1e-9) break;

    let md: number;
    if (H >= 11 && H <= 12) {
      md = (ramc - ra + 360) % 360;
      if (md > 180) md -= 360;
      const arg = (-Math.sin(md * DEG)) / (tanPhi * tanDec);
      if (Math.abs(arg) > 1) break; // asin domain guard
      angle = norm360(ra + Math.asin(arg) * RAD * 2 / 3);
    } else {
      md = (ra - ramc + 360) % 360;
      if (md > 180) md -= 360;
      const arg = Math.sin(md * DEG) / (tanPhi * tanDec);
      if (Math.abs(arg) > 1) break;
      angle = norm360(ra - Math.asin(arg) * RAD / 3);
    }
    if (Math.abs(angle - prev) < 0.0001) break;
    prev = angle;
  }
  return norm360(angle);
}

/** Returns ecliptic longitudes for Placidus house cusps 1–12 (tropical degrees) */
export function placidusHouseCusps(jd: number, lat: number, lng: number, obliq: number): number[] {
  const ramc = localSiderealTime(jd, lng); // RAMC in degrees
  const asc  = ascendantDegree(ramc, obliq, lat);

  // Midheaven (10th cusp)
  const mc = norm360(Math.atan2(Math.cos(ramc * DEG), -Math.sin(ramc * DEG) * Math.cos(obliq * DEG)) * RAD);

  // Cusps 11, 12 (upper, between MC and ASC)
  const c11 = placidusOHC(11, ramc, obliq, lat);
  const c12 = placidusOHC(12, ramc, obliq, lat);

  // Cusps 2, 3 (lower, between ASC and IC)
  const c2  = placidusOHC(2, ramc, obliq, lat);
  const c3  = placidusOHC(3, ramc, obliq, lat);

  // IC = MC + 180, opposite cusps = cusp + 180
  const cusps = new Array(12);
  cusps[0]  = asc;
  cusps[1]  = c2;
  cusps[2]  = c3;
  cusps[3]  = norm360(mc + 180); // IC = 4th
  cusps[4]  = norm360(c3 + 180);
  cusps[5]  = norm360(c2 + 180);
  cusps[6]  = norm360(asc + 180); // 7th
  cusps[7]  = norm360(c11 + 180); // actually c8
  cusps[8]  = norm360(c12 + 180); // c9
  cusps[9]  = mc;                  // 10th
  cusps[10] = c11;
  cusps[11] = c12;

  return cusps;
}

/** Determine KP house (1–12) for a planet given Placidus cusps (tropical) */
export function kpHouseOf(tropicalPlanet: number, tropicalCusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = tropicalCusps[i];
    const end   = tropicalCusps[(i + 1) % 12];
    const p     = norm360(tropicalPlanet);
    if (start < end) {
      if (p >= start && p < end) return i + 1;
    } else {
      if (p >= start || p < end) return i + 1;
    }
  }
  return 1;
}

// ── Vimshottari Dasha ─────────────────────────────────────────────────────────

function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + Math.floor(years));
  const rem = (years % 1) * 365.25 * 24 * 3600 * 1000;
  return new Date(d.getTime() + rem);
}

export function vimshottariDasha(moonSiderealDeg: number, birthDate: Date) {
  const nak = getNakshatra(moonSiderealDeg);
  const nakIndex = nak.index;
  const nakLord  = NAKSHATRAS[nakIndex].lord;

  // Fraction of the birth nakshatra already elapsed at the moment of birth
  const nakshatraSpan   = 360 / 27;
  const posInNak        = norm360(moonSiderealDeg) - nakIndex * nakshatraSpan;
  const fractionElapsed = Math.max(0, Math.min(1, posInNak / nakshatraSpan));

  const startOrderIdx     = VIMSHOTTARI_ORDER.indexOf(nakLord);
  const firstFullYears    = VIMSHOTTARI_YEARS[nakLord];
  const remainingFirst    = firstFullYears * (1 - fractionElapsed);

  // Theoretical start of the first dasha (before birth, used for correct antardasha dates)
  const firstTheoStart = addYears(birthDate, -(firstFullYears * fractionElapsed));

  const today  = new Date();
  const dashas = [];
  let cursor   = birthDate; // tracks the start of the next dasha

  for (let i = 0; i < 9; i++) {
    const lord      = VIMSHOTTARI_ORDER[(startOrderIdx + i) % 9];
    const fullYears = VIMSHOTTARI_YEARS[lord];
    const dashaLen  = i === 0 ? remainingFirst : fullYears;
    const dashaStart = i === 0 ? birthDate : cursor;
    const dashaEnd   = addYears(dashaStart, dashaLen);

    // Antardashas are ALWAYS proportional to the full mahadasha years.
    // For the first (partial) dasha, sub-periods run from the theoretical start
    // so their absolute dates are correct; we simply skip/trim any that fall before birth.
    const antTheorStart = i === 0 ? firstTheoStart : dashaStart;
    const antOrderIdx   = VIMSHOTTARI_ORDER.indexOf(lord);
    const antardashas   = [];
    let antCursor       = antTheorStart;

    for (let j = 0; j < 9; j++) {
      const antLord  = VIMSHOTTARI_ORDER[(antOrderIdx + j) % 9];
      const antYears = fullYears * VIMSHOTTARI_YEARS[antLord] / TOTAL_YEARS;
      const antEnd   = addYears(antCursor, antYears);

      // Skip sub-periods that ended entirely before birth (first dasha only)
      if (antEnd <= birthDate) {
        antCursor = antEnd;
        continue;
      }

      // If this sub-period straddles birth, clamp display start to birthDate
      const displayStart = antCursor < birthDate ? birthDate : antCursor;

      antardashas.push({
        planet:    antLord,
        startDate: displayStart.toISOString().slice(0, 10),
        endDate:   antEnd.toISOString().slice(0, 10),
        isCurrent: today >= displayStart && today < antEnd,
      });
      antCursor = antEnd;
    }

    dashas.push({
      planet:     lord,
      startDate:  dashaStart.toISOString().slice(0, 10),
      endDate:    dashaEnd.toISOString().slice(0, 10),
      isCurrent:  today >= dashaStart && today < dashaEnd,
      antardashas,
    });

    cursor = dashaEnd;
  }

  return dashas;
}

// ── Divisional Charts (Vargas) ────────────────────────────────────────────────

/**
 * Compute the divisional sign for D-N (D-2,3,4,7,9,12,16,20,24,27,30,...).
 * Uses the uniform sequential formula — valid for all standard vargas except D-10.
 *   partSize = 30 / N
 *   partNum  = floor(siderealDeg / partSize)  (across full 360°)
 *   signNum  = (partNum % 12) + 1
 *
 * Correctness check for D-9:
 *   Aries (0°): partNum 0 → Aries ✓   Taurus (30°): partNum 9 → Capricorn ✓
 *   Gemini (60°): partNum 18 → Libra ✓  Cancer (90°): partNum 27 → Cancer ✓
 */
export function getDivisionalSign(siderealDeg: number, N: number): number {
  const sid      = norm360(siderealDeg);
  const partSize = 30 / N;
  const partNum  = Math.floor(sid / partSize);
  return (partNum % 12) + 1;
}

/**
 * D-10 (Dashamsha) — Traditional Parashara rule.
 * Each sign is split into 10 parts of 3° each.
 *   Odd signs  (1,3,5,7,9,11): first sub-part = the sign itself, count forward.
 *   Even signs (2,4,6,8,10,12): first sub-part = 9th sign from that sign (i.e. sign+8).
 *
 * Correctness check:
 *   Aries  0° (odd, part 0): 1+0 = Aries ✓
 *   Taurus 0° (even, part 0): 2+8 = Capricorn ✓  (9th from Taurus)
 *   Taurus 27° (part 9): (2+8+9)%12 = 7 = Libra ✓  (10th part of Taurus)
 */
export function getD10Sign(siderealDeg: number): number {
  const sid     = norm360(siderealDeg);
  const signNum = Math.floor(sid / 30) + 1;      // 1–12
  const partNum = Math.floor((sid % 30) / 3);     // 0–9
  const isOdd   = signNum % 2 === 1;
  return ((signNum - 1 + (isOdd ? 0 : 8) + partNum) % 12) + 1;
}

// ── Full chart builder ────────────────────────────────────────────────────────

export interface RawPlanetData {
  name: string;
  tropical: number;
  retrograde: boolean;
}

export function allPlanetPositions(jd: number): RawPlanetData[] {
  const lon = (b: string) => bodyLongitude(b, jd);
  return [
    { name: "Sun",     tropical: lon("Sun"),     retrograde: false },
    { name: "Moon",    tropical: lon("Moon"),    retrograde: false },
    { name: "Mercury", tropical: lon("Mercury"), retrograde: isRetrograde("Mercury", jd) },
    { name: "Venus",   tropical: lon("Venus"),   retrograde: isRetrograde("Venus",   jd) },
    { name: "Mars",    tropical: lon("Mars"),    retrograde: isRetrograde("Mars",    jd) },
    { name: "Jupiter", tropical: lon("Jupiter"), retrograde: isRetrograde("Jupiter", jd) },
    { name: "Saturn",  tropical: lon("Saturn"),  retrograde: isRetrograde("Saturn",  jd) },
    { name: "Uranus",  tropical: lon("Uranus"),  retrograde: isRetrograde("Uranus",  jd) },
    { name: "Neptune", tropical: lon("Neptune"), retrograde: isRetrograde("Neptune", jd) },
    { name: "Rahu",    tropical: rahuLongitude(jd), retrograde: true },
    { name: "Ketu",    tropical: ketuLongitude(jd), retrograde: true },
  ];
}
