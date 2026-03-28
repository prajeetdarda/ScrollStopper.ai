"use client";

import { useState } from "react";
import type { ReelScript } from "@/lib/types";

interface ScriptDisplayProps {
  script: ReelScript;
  caption: string;
  hashtags: string[];
  captionOnly?: boolean;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

export default function ScriptDisplay({
  script,
  caption,
  hashtags,
  captionOnly = false,
}: ScriptDisplayProps) {
  const fullScript = `HOOK (first 3 sec):\n${script.hook}\n\nBODY:\n${script.body}\n\nCTA:\n${script.cta}`;
  const hashtagText = hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ");
  const fullCaption = `${caption}\n\n${hashtagText}`;

  if (captionOnly) {
    return (
      <div>
        <div className="flex items-center justify-end mb-4">
          <CopyButton text={fullCaption} label="Copy all" />
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line mb-3">
          {caption}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {hashtags.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-purple-400/80 bg-purple-500/10 px-2 py-0.5 rounded-md"
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <CopyButton text={fullScript} label="Copy script" />
      </div>
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase">
            Hook — First 3 seconds
          </span>
          <p className="text-white font-medium mt-1 leading-relaxed">
            {script.hook}
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase">
            Body
          </span>
          <p className="text-zinc-300 mt-1 leading-relaxed whitespace-pre-line">
            {script.body}
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-green-400 uppercase">
            Call to Action
          </span>
          <p className="text-zinc-300 mt-1 leading-relaxed">{script.cta}</p>
        </div>
      </div>
    </div>
  );
}
