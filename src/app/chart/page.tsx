"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ComputedChart, Planet, DashaPeriod, DivisionalPlanet } from "@/types";
import BirthDetailsForm, {
  loadComputedChart,
  loadBirthData,
  clearBirthData,
} from "@/components/BirthDetailsForm";

// ── South Indian chart grid (HTML, not SVG — for crisp text) ─────────────────

// Fixed sign positions in South Indian format (1-based row/col for CSS grid)
const SI_CELLS: { signNum: number; row: number; col: number }[] = [
  { signNum: 12, row: 1, col: 1 }, { signNum:  1, row: 1, col: 2 },
  { signNum:  2, row: 1, col: 3 }, { signNum:  3, row: 1, col: 4 },
  { signNum: 11, row: 2, col: 1 },                                   { signNum: 4, row: 2, col: 4 },
  { signNum: 10, row: 3, col: 1 },                                   { signNum: 5, row: 3, col: 4 },
  { signNum:  9, row: 4, col: 1 }, { signNum:  8, row: 4, col: 2 },
  { signNum:  7, row: 4, col: 3 }, { signNum:  6, row: 4, col: 4 },
];

const SIGN_FULL = [
  "","Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
];

// Traditional 2-letter Vedic abbreviations
const P_ABBR: Record<string, string> = {
  Sun:"Su", Moon:"Mo", Mars:"Ma", Mercury:"Me", Jupiter:"Ju",
  Venus:"Ve", Saturn:"Sa", Rahu:"Ra", Ketu:"Ke", Uranus:"Ur", Neptune:"Ne",
};

function SouthIndianGrid({ planets, lagnaSignNum }: {
  planets: Planet[];
  lagnaSignNum: number;
}) {
  const bySign: Record<number, Planet[]> = {};
  for (let i = 1; i <= 12; i++) bySign[i] = [];
  for (const p of planets) bySign[p.signNum]?.push(p);

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        aspectRatio: "1",
        gap: "1px",
        backgroundColor: "#1e2028",
        border: "1px solid #1e2028",
      }}
    >
      {/* 12 sign cells */}
      {SI_CELLS.map(({ signNum, row, col }) => {
        const isLagna    = signNum === lagnaSignNum;
        const houseNum   = ((signNum - lagnaSignNum + 12) % 12) + 1;
        const here       = bySign[signNum] ?? [];

        return (
          <div
            key={signNum}
            style={{ gridRow: row, gridColumn: col }}
            className={`relative flex flex-col p-2 min-h-0 transition-colors ${
              isLagna
                ? "bg-amber-950/25 ring-1 ring-inset ring-amber-500/50"
                : "bg-zinc-950 hover:bg-zinc-900/60"
            }`}
          >
            {/* House number — top right */}
            <span className="absolute top-1.5 right-2 text-[9px] font-mono text-zinc-700">
              {houseNum}
            </span>

            {/* Sign name */}
            <span className={`text-[10px] font-semibold leading-tight mb-1 ${
              isLagna ? "text-amber-300" : "text-zinc-600"
            }`}>
              {SIGN_FULL[signNum]}
              {isLagna && <span className="ml-1 text-amber-500/70 font-normal text-[8px] tracking-wide uppercase">Asc</span>}
            </span>

            {/* Planets */}
            <div className="flex flex-col gap-[2px]">
              {here.map(p => (
                <span
                  key={p.name}
                  className={`text-[11px] font-semibold leading-none ${
                    p.retrograde ? "text-rose-400" : "text-zinc-100"
                  }`}
                  title={`${p.name}${p.retrograde ? " (R)" : ""} — ${p.sign} ${(p.sidereal % 30).toFixed(1)}°`}
                >
                  {P_ABBR[p.name] ?? p.name.slice(0, 2)}
                  {p.retrograde && <span className="text-[8px] align-super opacity-80">R</span>}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* Centre 2×2 merged panel */}
      <div
        style={{ gridRow: "2 / 4", gridColumn: "2 / 4" }}
        className="bg-zinc-950 flex flex-col items-center justify-center gap-1"
      >
        <span className="text-zinc-800 text-[10px] font-playfair tracking-widest uppercase">South</span>
        <span className="text-zinc-800 text-[10px] font-playfair tracking-widest uppercase">Indian</span>
      </div>
    </div>
  );
}

// ── Divisional chart grid (compact, for Varga cards) ─────────────────────────

function DivisionalGrid({ planets, lagnaSignNum }: {
  planets: DivisionalPlanet[];
  lagnaSignNum: number;
}) {
  const bySign: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) bySign[i] = [];
  for (const p of planets) bySign[p.signNum]?.push(p.name);

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        aspectRatio: "1",
        gap: "1px",
        backgroundColor: "#1e2028",
        border: "1px solid #1e2028",
      }}
    >
      {SI_CELLS.map(({ signNum, row, col }) => {
        const isLagna = signNum === lagnaSignNum;
        const here    = bySign[signNum] ?? [];
        return (
          <div
            key={signNum}
            style={{ gridRow: row, gridColumn: col }}
            className={`relative flex flex-col p-1 min-h-0 ${
              isLagna
                ? "bg-amber-950/20 ring-1 ring-inset ring-amber-500/40"
                : "bg-zinc-950"
            }`}
          >
            <span className={`text-[7px] font-semibold leading-tight mb-0.5 ${
              isLagna ? "text-amber-300" : "text-zinc-700"
            }`}>
              {SIGN_FULL[signNum].slice(0, 3)}
            </span>
            <div className="flex flex-wrap gap-[1px]">
              {here.map(name => (
                <span key={name} className="text-[9px] font-semibold text-zinc-200 leading-none">
                  {P_ABBR[name] ?? name.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      {/* Centre 2×2 merged */}
      <div
        style={{ gridRow: "2 / 4", gridColumn: "2 / 4" }}
        className="bg-zinc-950 flex items-center justify-center"
      >
        <span className="text-zinc-800 text-[7px] tracking-widest uppercase font-mono">D-N</span>
      </div>
    </div>
  );
}

// ── Planet table ──────────────────────────────────────────────────────────────

function PlanetTable({ planets }: { planets: Planet[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest">Planet</th>
            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest">Sign · Degree</th>
            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest">Nakshatra</th>
            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest hidden sm:table-cell">Pada</th>
            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] uppercase tracking-widest">H</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((p, i) => (
            <tr key={p.name} className={`border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors ${i % 2 === 1 ? "bg-zinc-900/10" : ""}`}>
              <td className="py-2.5 px-4">
                <span className={`font-medium ${p.retrograde ? "text-rose-400" : "text-zinc-100"}`}>
                  {p.name}
                </span>
                {p.retrograde && (
                  <span className="ml-1.5 text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-medium">R</span>
                )}
              </td>
              <td className="py-2.5 px-4">
                <span className="text-zinc-200">{p.sign}</span>
                <span className="text-zinc-600 ml-2 font-mono text-xs">{(p.sidereal % 30).toFixed(2)}°</span>
              </td>
              <td className="py-2.5 px-4">
                <span className="text-zinc-300">{p.nakshatra}</span>
                <span className="text-amber-500/60 text-xs ml-1.5">({p.nakshatraLord})</span>
              </td>
              <td className="py-2.5 px-4 text-zinc-600 text-xs hidden sm:table-cell">Pada {p.pada}</td>
              <td className="py-2.5 px-4 text-zinc-400 font-mono text-xs">{p.house}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── KP Cusp table ─────────────────────────────────────────────────────────────

function KPCuspTable({ cusps }: { cusps: ComputedChart["kp"]["cusps"] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="text-left py-2.5 px-3 text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Cusp</th>
            <th className="text-left py-2.5 px-3 text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Sign</th>
            <th className="text-left py-2.5 px-3 text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Deg°</th>
            <th className="text-left py-2.5 px-3 text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Star Lord</th>
            <th className="text-left py-2.5 px-3 text-zinc-500 font-medium uppercase tracking-widest text-[10px]">Sub Lord</th>
          </tr>
        </thead>
        <tbody>
          {cusps.map((c, i) => (
            <tr key={c.house} className={`border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors ${i % 2 === 1 ? "bg-zinc-900/10" : ""}`}>
              <td className="py-2 px-3 text-zinc-100 font-semibold font-mono">H{c.house}</td>
              <td className="py-2 px-3 text-zinc-300">{c.sign}</td>
              <td className="py-2 px-3 text-zinc-600 font-mono">{(c.degree % 30).toFixed(2)}°</td>
              <td className="py-2 px-3 text-amber-400/80">{c.nakshatraLord}</td>
              <td className="py-2 px-3 text-violet-400/80">{c.subLord}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Dasha table ───────────────────────────────────────────────────────────────

function DashaTable({ dashas }: { dashas: DashaPeriod[] }) {
  const [expanded, setExpanded] = useState<string | null>(() => {
    // Auto-expand current dasha
    return dashas.find(d => d.isCurrent)?.planet ?? null;
  });

  return (
    <div className="space-y-1">
      {dashas.map(d => {
        const isOpen = expanded === d.planet;
        return (
          <div key={d.planet} className={`rounded-xl border transition-colors ${
            d.isCurrent
              ? "border-amber-500/20 bg-amber-500/[0.04]"
              : "border-zinc-800/60 bg-zinc-900/20"
          }`}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setExpanded(isOpen ? null : d.planet)}
            >
              <div className="flex items-center gap-3">
                {d.isCurrent && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                )}
                <span className={`text-sm font-medium ${d.isCurrent ? "text-amber-200" : "text-zinc-400"}`}>
                  {d.planet} Dasha
                </span>
                {d.isCurrent && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-400/80 px-2 py-0.5 rounded-full border border-amber-500/20 font-medium tracking-wide uppercase">
                    Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-700 hidden sm:block font-mono">
                  {d.startDate} – {d.endDate}
                </span>
                <span className="text-zinc-700 text-xs">{isOpen ? "▾" : "▸"}</span>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-zinc-800/60 px-4 pb-4 pt-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800/60">
                      <th className="text-left pb-2 text-zinc-600 font-medium uppercase tracking-widest text-[10px]">Sub-period (Bhukti)</th>
                      <th className="text-left pb-2 text-zinc-600 font-medium uppercase tracking-widest text-[10px]">From</th>
                      <th className="text-left pb-2 text-zinc-600 font-medium uppercase tracking-widest text-[10px]">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.antardashas.map(a => (
                      <tr key={a.planet} className={`border-b border-zinc-800/30 ${
                        a.isCurrent ? "text-amber-200" : "text-zinc-600"
                      }`}>
                        <td className="py-1.5 font-medium">
                          {d.planet} / {a.planet}
                          {a.isCurrent && (
                            <span className="ml-2 text-amber-400/70 text-[10px] font-mono">◀ now</span>
                          )}
                        </td>
                        <td className="py-1.5 font-mono">{a.startDate}</td>
                        <td className="py-1.5 font-mono">{a.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Chart display (after computation) ────────────────────────────────────────

function ChartDisplay({ chart, onReset }: { chart: ComputedChart; onReset: () => void }) {
  const [tab, setTab] = useState<"vedic" | "kp" | "vargas">("vedic");

  // Vargas are computed from Vedic; when vargas tab is active keep vedic as reference system
  const activeSystem  = tab === "kp" ? "kp" : "vedic";
  const active        = activeSystem === "vedic" ? chart.vedic : chart.kp;
  const planets       = active.planets;
  const ascSignNum    = active.ascendant.signNum;
  const currentDasha  = active.dashas.find(d => d.isCurrent);
  const currentAntar  = currentDasha?.antardashas.find(a => a.isCurrent);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm">
          ← Home
        </Link>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex-1 min-w-0">
          <h1 className="font-playfair text-base font-bold text-zinc-100 truncate">
            {chart.meta.name ? `${chart.meta.name}'s Birth Chart` : "Birth Chart"}
          </h1>
          <p className="text-xs text-zinc-600 font-mono">
            {chart.meta.dob} · {chart.meta.tob} · {chart.meta.city}, {chart.meta.country}
          </p>
        </div>
        <button
          onClick={onReset}
          className="shrink-0 text-xs text-zinc-700 hover:text-zinc-400 transition-colors"
        >
          ✎ Edit
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* System tabs */}
        <div className="flex flex-wrap gap-2">
          {([
            { id: "vedic",  label: "Vedic"             },
            { id: "kp",     label: "KP System"         },
            { id: "vargas", label: "Divisional Charts" },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all tracking-wide ${
                tab === id
                  ? "bg-amber-500 text-zinc-950 shadow-sm"
                  : "border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 bg-zinc-900/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Summary strip */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { label: "Ascendant", value: active.ascendant.sign, sub: active.ascendant.nakshatra, color: "text-amber-300" },
            { label: "Moon",      value: planets.find(p => p.name === "Moon")?.sign ?? "—", sub: planets.find(p => p.name === "Moon")?.nakshatra ?? "", color: "text-zinc-100" },
            { label: "Sun",       value: planets.find(p => p.name === "Sun")?.sign  ?? "—", sub: planets.find(p => p.name === "Sun")?.nakshatra  ?? "", color: "text-zinc-100" },
            { label: "Dasha",     value: currentDasha?.planet ?? "—", sub: currentAntar ? `${currentAntar.planet} until ${currentAntar.endDate}` : (currentDasha?.endDate ? `until ${currentDasha.endDate}` : ""), color: "text-zinc-100" },
          ].map((item, i) => (
            <div key={item.label} className={i > 0 ? "border-l border-zinc-800/60 pl-5" : ""}>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1.5 font-medium">{item.label}</p>
              <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-zinc-600 truncate mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Vedic / KP main grid ── */}
        {tab !== "vargas" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left col: chart + KP cusps */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-4">
                  {tab === "vedic" ? "Rashi Chart · Whole-Sign" : "KP Chart · Placidus"}
                </h2>
                <SouthIndianGrid planets={planets} lagnaSignNum={ascSignNum} />
              </div>

              {tab === "kp" && (
                <div>
                  <h2 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
                    House Cusps &amp; Sub-Lords
                  </h2>
                  <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
                    <KPCuspTable cusps={chart.kp.cusps} />
                  </div>
                </div>
              )}
            </div>

            {/* Right col: planets + dasha */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
                  Planetary Positions
                </h2>
                <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
                  <PlanetTable planets={planets} />
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
                  Vimshottari Dasha
                </h2>
                <DashaTable dashas={active.dashas} />
              </div>
            </div>
          </div>
        )}

        {/* ── Divisional charts (Vargas) grid ── */}
        {tab === "vargas" && (
          chart.vedic.divisional ? (
            <div className="space-y-6">
              <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
                Divisional charts (Vargas) are derived from your Vedic birth chart by sub-dividing each sign.
                Each varga reveals a specific domain of life with greater precision than the rashi chart alone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {([
                  { key: "d9",  title: "Navamsha",       badge: "D-9",  purpose: "Marriage · Dharma · Soul strength",    d: chart.vedic.divisional.d9  },
                  { key: "d10", title: "Dashamsha",      badge: "D-10", purpose: "Career · Status · Public life",         d: chart.vedic.divisional.d10 },
                  { key: "d3",  title: "Drekkana",       badge: "D-3",  purpose: "Siblings · Courage · Initiative",       d: chart.vedic.divisional.d3  },
                  { key: "d7",  title: "Saptamsha",      badge: "D-7",  purpose: "Children · Progeny · Creativity",       d: chart.vedic.divisional.d7  },
                  { key: "d4",  title: "Chaturthamsha",  badge: "D-4",  purpose: "Property · Fortune · Fixed assets",     d: chart.vedic.divisional.d4  },
                  { key: "d12", title: "Dwadashamsha",   badge: "D-12", purpose: "Parents · Ancestry · Origins",          d: chart.vedic.divisional.d12 },
                  { key: "d2",  title: "Hora",           badge: "D-2",  purpose: "Wealth · Financial potential",          d: chart.vedic.divisional.d2  },
                ] as const).map(({ key, title, badge, purpose, d }) => (
                  <div key={key} className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-4 flex flex-col gap-3 hover:border-zinc-700/60 transition-colors">

                    {/* Card header */}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-playfair text-sm font-semibold text-zinc-100">{title}</h3>
                        <span className="text-[9px] font-mono text-amber-400/60 bg-amber-500/8 border border-amber-500/15 px-1.5 py-0.5 rounded font-semibold tracking-wider">
                          {badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600">{purpose}</p>
                      <p className="text-[11px] mt-1">
                        <span className="text-zinc-700">Lagna: </span>
                        <span className="text-amber-300/80 font-medium">{d.ascendant.sign}</span>
                      </p>
                    </div>

                    {/* Compact South Indian grid */}
                    <DivisionalGrid planets={d.planets} lagnaSignNum={d.ascendant.signNum} />

                    {/* Planet sign placements (excludes Uranus/Neptune for brevity) */}
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 pt-2 border-t border-zinc-800/40">
                      {d.planets
                        .filter(p => !["Uranus", "Neptune"].includes(p.name))
                        .map(p => (
                          <div key={p.name} className="flex items-center gap-1 text-[10px]">
                            <span className="text-zinc-600 w-4 shrink-0 font-mono">{P_ABBR[p.name] ?? p.name.slice(0,2)}</span>
                            <span className="text-zinc-400 flex-1">{p.sign.slice(0, 3)}</span>
                            <span className="text-zinc-700 font-mono">H{p.house}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-10 text-center">
              <p className="text-zinc-500 text-sm">
                Divisional chart data not available — please regenerate your birth chart.
              </p>
              <button
                onClick={onReset}
                className="mt-4 rounded-lg border border-zinc-700/60 px-5 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
              >
                Regenerate Chart
              </button>
            </div>
          )
        )}

        {/* Advisor CTA */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <p className="font-playfair text-lg font-semibold text-zinc-100">
              Ready to understand your chart?
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              Choose a specialist advisor and ask anything — career, relationships, finances, health, timing.
            </p>
          </div>
          <Link
            href="/agents"
            className="shrink-0 rounded-lg bg-amber-500 px-7 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            Choose an Advisor →
          </Link>
        </div>

      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ChartPage() {
  const [chart, setChart] = useState<ComputedChart | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    setChart(loadComputedChart() ?? null);
  }, []);

  // Loading (prevents flash of form before localStorage is read)
  if (chart === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="h-8 w-8 rounded-full border-2 border-neutral-800 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  // No chart → show birth form
  if (!chart) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col">
        {/* Minimal nav */}
        <div className="flex items-center gap-3 border-b border-neutral-800 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl text-amber-400">☸</span>
            <span className="font-playfair font-bold text-amber-400">Astro AI</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <BirthDetailsForm
            agentName="Astro AI"
            agentIcon="☸"
            agentColor="#f59e0b"
            onComplete={() => {
              // Reload chart from localStorage after form saves it
              setChart(loadComputedChart());
            }}
          />
        </div>
      </div>
    );
  }

  // Chart exists → show it
  return (
    <ChartDisplay
      chart={chart}
      onReset={() => {
        clearBirthData();
        setChart(null);
      }}
    />
  );
}
