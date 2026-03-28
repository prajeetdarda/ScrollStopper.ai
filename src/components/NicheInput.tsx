"use client";

import { useState } from "react";

const EXAMPLE_NICHES = [
  "Fitness coach for busy moms",
  "Personal finance for Gen Z",
  "Career coach for engineers",
  "Budget travel in Southeast Asia",
];

interface NicheInputProps {
  onSubmit: (niche: string) => void;
  isLoading: boolean;
}

export default function NicheInput({ onSubmit, isLoading }: NicheInputProps) {
  const [niche, setNiche] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (niche.trim()) onSubmit(niche.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4">
          ScrollStopper
        </h1>
        <p className="text-zinc-400 text-lg max-w-md mx-auto">
          AI-powered hook templates that show you exactly what to film.
          You bring the face — we bring the creative direction.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="niche"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            What&apos;s your niche?
          </label>
          <input
            id="niche"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., fitness coach for busy moms"
            className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg transition-all"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!niche.trim() || isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating hooks...
            </span>
          ) : (
            "Generate Hook Ideas"
          )}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-xs text-zinc-500 mb-3 text-center">Try an example:</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          {EXAMPLE_NICHES.map((example) => (
            <button
              key={example}
              onClick={() => {
                setNiche(example);
                onSubmit(example);
              }}
              disabled={isLoading}
              className="px-3 py-1.5 text-sm bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-lg hover:bg-zinc-700/50 hover:text-zinc-300 transition-all disabled:opacity-40 whitespace-nowrap text-center"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="mt-12 rounded-xl bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-orange-400/10 border border-purple-400/20 p-5 backdrop-blur-sm">
        <p className="text-[11px] bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent uppercase tracking-widest text-center mb-3 font-semibold">Coming Soon</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "📈", text: "Trending Hooks Feed" },
            { icon: "📅", text: "Batch Mode — Week of Content" },
            { icon: "🎥", text: "AI Hook Video Generation" },
            { icon: "✂️", text: "AI Post-Production & Editing" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[11px] text-zinc-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
