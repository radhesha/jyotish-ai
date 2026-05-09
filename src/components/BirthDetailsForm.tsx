"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ComputedChart } from "@/types";

export interface BirthData {
  name: string;
  dob: string;        // YYYY-MM-DD
  tob: string;        // HH:MM or ""
  tobUnknown: boolean;
  city: string;
  country: string;
  utcOffset: number;  // UTC offset in decimal hours, e.g. 5.5 for IST
}

const BIRTH_KEY  = "astro_birth_data";
const CHART_KEY  = "astro_computed_chart";

export function saveBirthData(data: BirthData) {
  localStorage.setItem(BIRTH_KEY, JSON.stringify(data));
}
export function loadBirthData(): BirthData | null {
  try {
    const raw = localStorage.getItem(BIRTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export function clearBirthData() {
  localStorage.removeItem(BIRTH_KEY);
  localStorage.removeItem(CHART_KEY);
}

export function saveComputedChart(chart: ComputedChart) {
  localStorage.setItem(CHART_KEY, JSON.stringify(chart));
}
export function loadComputedChart(): ComputedChart | null {
  try {
    const raw = localStorage.getItem(CHART_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

interface Props {
  onComplete?: (data: BirthData) => void;
  agentName?: string;
  agentIcon?: string;
  agentColor?: string;
}

export default function BirthDetailsForm({ onComplete, agentName, agentIcon, agentColor }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "form">("intro");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [tobUnknown, setTobUnknown] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [utcOffset, setUtcOffset] = useState("5.5"); // default IST
  const [error, setError] = useState("");
  const [computing, setComputing] = useState(false);
  const [computeStep, setComputeStep] = useState("");

  const accentColor = agentColor ?? "#f59e0b";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dob)          { setError("Please enter your date of birth."); return; }
    if (!city.trim())  { setError("Please enter your city of birth."); return; }
    if (!country.trim()){ setError("Please enter your country of birth."); return; }

    const data: BirthData = {
      name: name.trim(),
      dob,
      tob: tobUnknown ? "" : tob,
      tobUnknown,
      city: city.trim(),
      country: country.trim(),
      utcOffset: parseFloat(utcOffset) || 0,
    };

    setComputing(true);
    setComputeStep("Finding your birth location…");

    try {
      setComputeStep("Computing planetary positions…");
      const res = await fetch("/api/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Chart computation failed");
      }

      const chart: ComputedChart = await res.json();

      setComputeStep("Saving your chart…");
      saveBirthData(data);
      saveComputedChart(chart);

      if (onComplete) {
        // Parent handles what happens next (e.g. chart page shows the chart inline)
        onComplete(data);
      } else {
        // Default: navigate to chart page
        router.push("/chart");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
      setComputing(false);
      setComputeStep("");
    }
  };

  if (step === "intro") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-6 py-12 max-w-lg mx-auto">
        <div className="text-6xl">{agentIcon ?? "☸"}</div>
        <div>
          <h2 className="font-playfair text-2xl font-bold text-neutral-100">
            Hi, I&apos;m {agentName ?? "your advisor"}
          </h2>
          <p className="mt-3 text-neutral-500 leading-relaxed text-sm">
            First, I&apos;ll generate your personalised birth chart — free, instantly. Then we can talk about anything in it.
          </p>
        </div>
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-left space-y-3">
          {[
            { icon: "📅", label: "Date of birth",          note: "Required" },
            { icon: "⏰", label: "Time of birth",          note: "Optional — improves accuracy" },
            { icon: "📍", label: "City & country of birth", note: "Required" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <span className="text-sm text-neutral-300 font-medium">{item.label}</span>
                <span className="ml-2 text-xs text-neutral-600">{item.note}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-left">
          <p className="text-xs text-amber-400/80 font-medium">✦ Free for everyone</p>
          <p className="text-xs text-neutral-600 mt-1">
            Your Vedic &amp; KP birth charts are generated instantly at no cost.
          </p>
        </div>
        <button
          onClick={() => setStep("form")}
          className="w-full rounded-full py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          Generate My Chart →
        </button>
        <p className="text-xs text-neutral-700">
          Your details are stored only on your device. We never send them to a server.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 max-w-lg mx-auto w-full">
      <div className="w-full">
        <button
          onClick={() => setStep("intro")}
          className="mb-6 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          disabled={computing}
        >
          ← Back
        </button>

        <h2 className="font-playfair text-xl font-bold text-neutral-100 mb-1">
          Your birth details
        </h2>
        <p className="text-sm text-neutral-600 mb-6">
          Used only to compute your chart. Stored on your device.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
              Your first name <span className="text-neutral-700 normal-case">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya"
              disabled={computing}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Date of birth */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
              Date of birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              disabled={computing}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600 transition-colors [color-scheme:dark] disabled:opacity-50"
            />
          </div>

          {/* Time of birth */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
              Time of birth
            </label>
            {tobUnknown ? (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-neutral-600">
                Unknown — chart will use solar positions
              </div>
            ) : (
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                disabled={computing}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600 transition-colors [color-scheme:dark] disabled:opacity-50"
              />
            )}
            <label className="mt-2 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tobUnknown}
                onChange={(e) => setTobUnknown(e.target.checked)}
                disabled={computing}
                className="rounded border-neutral-700 bg-neutral-800 accent-amber-400"
              />
              <span className="text-xs text-neutral-600">I don&apos;t know my birth time</span>
            </label>
          </div>

          {/* City + Country */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
                City of birth <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                disabled={computing}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. India"
                disabled={computing}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {/* UTC Offset */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
              UTC Offset <span className="text-red-500">*</span>
              <span className="ml-1 text-neutral-700 normal-case font-normal">— timezone at birth place</span>
            </label>
            <select
              value={utcOffset}
              onChange={(e) => setUtcOffset(e.target.value)}
              disabled={computing}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600 transition-colors disabled:opacity-50 [color-scheme:dark]"
            >
              {[
                ["-12","UTC−12:00"],  ["-11","UTC−11:00"],  ["-10","UTC−10:00"],
                ["-9.5","UTC−09:30"],["-9","UTC−09:00"],    ["-8","UTC−08:00"],
                ["-7","UTC−07:00"],  ["-6","UTC−06:00"],    ["-5","UTC−05:00"],
                ["-4.5","UTC−04:30"],["-4","UTC−04:00"],    ["-3.5","UTC−03:30"],
                ["-3","UTC−03:00"],  ["-2","UTC−02:00"],    ["-1","UTC−01:00"],
                ["0","UTC±00:00"],   ["1","UTC+01:00"],     ["2","UTC+02:00"],
                ["3","UTC+03:00"],   ["3.5","UTC+03:30"],   ["4","UTC+04:00"],
                ["4.5","UTC+04:30"], ["5","UTC+05:00"],     ["5.5","UTC+05:30 — India (IST)"],
                ["5.75","UTC+05:45 — Nepal"],               ["6","UTC+06:00"],
                ["6.5","UTC+06:30 — Myanmar"],              ["7","UTC+07:00"],
                ["8","UTC+08:00"],   ["8.75","UTC+08:45"],  ["9","UTC+09:00"],
                ["9.5","UTC+09:30"], ["10","UTC+10:00"],    ["10.5","UTC+10:30"],
                ["11","UTC+11:00"],  ["12","UTC+12:00"],    ["12.75","UTC+12:45"],
                ["13","UTC+13:00"],  ["14","UTC+14:00"],
              ].map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={computing}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:opacity-90 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: accentColor }}
          >
            {computing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-neutral-950/30 border-t-neutral-950 animate-spin" />
                {computeStep}
              </>
            ) : (
              "Generate My Chart →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
