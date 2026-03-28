"use client";

import type { HookTopic, ImageProvider } from "@/lib/types";
import { useState } from "react";

interface TopicSelectorProps {
  topics: HookTopic[];
  niche: string;
  onSelect: (topic: HookTopic, provider: ImageProvider, imageCount: number) => void;
  onBack: () => void;
  isLoading: boolean;
}

const FRAMEWORK_COLORS: Record<string, string> = {
  "Problem-agitation": "from-red-500/20 to-red-600/10 border-red-500/30",
  "Curiosity gap": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "Contrarian/myth-busting": "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  "Bold claim / result": "from-green-500/20 to-green-600/10 border-green-500/30",
  "Open loop": "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "\"You\" accusation": "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
  "Social proof / authority": "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  "Time-sensitive / urgency": "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  "Hot take / polarizing": "from-rose-500/20 to-rose-600/10 border-rose-500/30",
  "Relatable / caught in the act": "from-teal-500/20 to-teal-600/10 border-teal-500/30",
};

function getFrameworkColor(framework: string): string {
  for (const [key, value] of Object.entries(FRAMEWORK_COLORS)) {
    if (framework.toLowerCase().includes(key.toLowerCase().split("/")[0])) {
      return value;
    }
  }
  return "from-zinc-500/20 to-zinc-600/10 border-zinc-500/30";
}

export default function TopicSelector({
  topics,
  niche,
  onSelect,
  onBack,
  isLoading,
}: TopicSelectorProps) {
  const [imageProvider, setImageProvider] = useState<ImageProvider>("openai");
  const [imageCount, setImageCount] = useState<1 | 3>(1);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Home button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-4 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:text-purple-200 hover:border-purple-500/50 rounded-lg transition-all flex items-center gap-1.5 text-sm"
          title="Home"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
          </svg>
          Home
        </button>
      </div>

      {/* Settings row */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Image AI toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Image AI:</span>
          <div className="flex bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setImageProvider("openai")}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                imageProvider === "openai"
                  ? "bg-zinc-600 text-white"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              GPT Image
            </button>
            <button
              onClick={() => setImageProvider("gemini")}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                imageProvider === "gemini"
                  ? "bg-zinc-600 text-white"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Gemini
            </button>
          </div>
        </div>

        <div className="w-px h-5 bg-zinc-700" />

        {/* Image count toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Images:</span>
          <div className="flex bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setImageCount(1)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                imageCount === 1
                  ? "bg-zinc-600 text-white"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              1
              </button>
              <button
                onClick={() => setImageCount(3)}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  imageCount === 3
                    ? "bg-zinc-600 text-white"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                3
              </button>
            </div>
          </div>
      </div>

      {/* Warning for 3 images */}
      {imageCount === 3 && (
        <div className="mb-6 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
          <p className="text-xs text-amber-400">
            Generating 3 image variants will take 1-2 minutes. Grab a coffee while we work.
          </p>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Pick Your Hook</h2>
        <p className="text-zinc-400">
          5 scroll-stopping hooks for <span className="text-purple-400 font-medium">{niche}</span>
        </p>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic, imageProvider, imageCount)}
            disabled={isLoading}
            className={`w-full text-left p-5 rounded-xl border bg-gradient-to-r ${getFrameworkColor(
              topic.framework
            )} hover:scale-[1.01] transition-all disabled:opacity-40 disabled:cursor-not-allowed group`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {topic.framework}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 leading-tight">
                  &ldquo;{topic.hookLine}&rdquo;
                </h3>
                <p className="text-sm text-zinc-400 mt-2">{topic.description}</p>
                <p className="text-xs text-zinc-500 mt-2 italic">{topic.whyItWorks}</p>
              </div>
              <div className="text-zinc-600 group-hover:text-purple-400 transition-colors mt-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
