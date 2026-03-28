"use client";

import { useState } from "react";
import type { HookTemplate as HookTemplateType, ImageVariant } from "@/lib/types";
import DirectorBrief from "./DirectorBrief";
import ScriptDisplay from "./ScriptDisplay";

interface HookTemplateProps {
  template: HookTemplateType;
  onBack: () => void;
  onStartOver: () => void;
}

function ImageCard({ variant, index }: { variant: ImageVariant; index: number }) {
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    if (!variant.imageUrl) return;
    try {
      const response = await fetch(variant.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `scrollstopper-hook-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(variant.imageUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {variant.imageUrl && !error ? (
          <div className="relative aspect-[9/16]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={variant.imageUrl}
              alt={variant.label}
              className="w-full h-full object-cover"
              onError={() => setError(true)}
            />
          </div>
        ) : (
          <div className="aspect-[9/16] flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-zinc-500 text-xs">
                {error ? "Failed to load" : "Image unavailable"}
              </p>
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-semibold bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            {variant.label}
          </span>
        </div>
        {variant.imageUrl && !error && (
          <button
            onClick={handleDownload}
            className="absolute bottom-2 right-2 p-2 bg-black/60 text-white rounded-lg backdrop-blur-sm hover:bg-black/80 transition-all"
            title="Download"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-xs text-zinc-500 mt-2 text-center px-1">{variant.description}</p>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-semibold text-zinc-200">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="p-5 border-t border-zinc-800">{children}</div>}
    </div>
  );
}

export default function HookTemplate({ template, onBack, onStartOver }: HookTemplateProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onStartOver}
          className="px-4 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:text-purple-200 hover:border-purple-500/50 rounded-lg transition-all flex items-center gap-1.5 text-sm"
          title="Home"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
          </svg>
          Home
        </button>
        <div className="w-16" />
      </div>

      {/* Images — 1 centered or 3 side-by-side */}
      <div
        className={`grid gap-4 mb-8 ${
          template.imageVariants.length === 1
            ? "grid-cols-1 max-w-sm mx-auto"
            : "grid-cols-1 sm:grid-cols-3"
        }`}
      >
        {template.imageVariants.map((variant, i) => (
          <ImageCard key={i} variant={variant} index={i} />
        ))}
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3">
        <CollapsibleSection title="Director's Brief" icon="🎬">
          <DirectorBrief brief={template.directorBrief} />
        </CollapsibleSection>

        <CollapsibleSection title="Reel Script" icon="📝">
          <ScriptDisplay
            script={template.script}
            caption=""
            hashtags={[]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Caption & Hashtags" icon="📋">
          <ScriptDisplay
            script={{ hook: "", body: "", cta: "" }}
            caption={template.caption}
            hashtags={template.hashtags}
            captionOnly
          />
        </CollapsibleSection>
      </div>
    </div>
  );
}
