"use client";

import { useState } from "react";

export interface BirthData {
  name: string;
  dob: string;        // YYYY-MM-DD
  tob: string;        // HH:MM or ""
  tobUnknown: boolean;
  city: string;
  country: string;
  chartDetails?: string; // optional pasted chart data
}

const STORAGE_KEY = "astro_birth_data";

export function saveBirthData(data: BirthData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadBirthData(): BirthData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearBirthData() {
  localStorage.removeItem(STORAGE_KEY);
}

interface Props {
  onComplete: (data: BirthData) => void;
  agentName?: string;
  agentIcon?: string;
  agentColor?: string;
}

export default function BirthDetailsForm({ onComplete, agentName, agentIcon, agentColor }: Props) {
  const [step, setStep] = useState<"intro" | "form">("intro");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [tobUnknown, setTobUnknown] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [chartDetails, setChartDetails] = useState("");
  const [showChartDetails, setShowChartDetails] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) { setError("Please enter your date of birth."); return; }
    if (!city.trim()) { setError("Please enter your city of birth."); return; }
    if (!country.trim()) { setError("Please enter your country of birth."); return; }

    const data: BirthData = {
      name: name.trim(),
      dob,
      tob: tobUnknown ? "" : tob,
      tobUnknown,
      city: city.trim(),
      country: country.trim(),
      chartDetails: chartDetails.trim() || undefined,
    };
    saveBirthData(data);
    onComplete(data);
  };

  const accentColor = agentColor ?? "#f59e0b";

  if (step === "intro") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-6 py-12 max-w-lg mx-auto">
        <div className="text-6xl">{agentIcon ?? "☸"}</div>
        <div>
          <h2 className="font-playfair text-2xl font-bold text-neutral-100">
            Hi, I&apos;m {agentName ?? "your advisor"}
          </h2>
          <p className="mt-3 text-neutral-500 leading-relaxed text-sm">
            To give you a personalised reading based on your birth chart, I need a few details first. It only takes 30 seconds.
          </p>
        </div>
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-left space-y-3">
          {[
            { icon: "📅", label: "Date of birth", note: "Required" },
            { icon: "⏰", label: "Time of birth", note: "Optional — improves accuracy" },
            { icon: "📍", label: "City & country of birth", note: "Required" },
            { icon: "📋", label: "Your chart details", note: "Optional — for a more precise reading" },
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
        <button
          onClick={() => setStep("form")}
          className="w-full rounded-full py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          Enter My Details →
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
        >
          ← Back
        </button>

        <h2 className="font-playfair text-xl font-bold text-neutral-100 mb-1">
          Your birth details
        </h2>
        <p className="text-sm text-neutral-600 mb-6">
          Used only to read your chart. Stored on your device.
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
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors"
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
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Time of birth */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
              Time of birth
            </label>
            {tobUnknown ? (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-neutral-600">
                Unknown — I'll work with what I have
              </div>
            ) : (
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-neutral-600 transition-colors [color-scheme:dark]"
              />
            )}
            <label className="mt-2 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tobUnknown}
                onChange={(e) => setTobUnknown(e.target.checked)}
                className="rounded border-neutral-700 bg-neutral-800 accent-amber-400"
              />
              <span className="text-xs text-neutral-600">I don't know my birth time</span>
            </label>
          </div>

          {/* City */}
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
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors"
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
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Optional chart details */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowChartDetails(!showChartDetails)}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              <span>{showChartDetails ? "▾" : "▸"}</span>
              Have your chart details? Paste them for a more precise reading
            </button>
            {showChartDetails && (
              <div className="mt-3">
                <p className="text-xs text-neutral-700 mb-2">
                  Copy your planetary positions, house cusps, or Dasha periods from any astrology app (AstroSage, Jagannatha Hora, Astro-Vision, etc.) and paste below.
                </p>
                <textarea
                  value={chartDetails}
                  onChange={(e) => setChartDetails(e.target.value)}
                  placeholder="e.g. Sun 12°34' Aries, Moon 5°20' Scorpio, Lagna: Capricorn 18°, Saturn MD until Jan 2027..."
                  rows={5}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs text-neutral-300 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors resize-none"
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full py-3.5 text-sm font-semibold text-neutral-950 transition-all hover:opacity-90 mt-2"
            style={{ backgroundColor: accentColor }}
          >
            Start My Reading →
          </button>
        </form>
      </div>
    </div>
  );
}
