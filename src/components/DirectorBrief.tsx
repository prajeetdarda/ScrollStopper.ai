"use client";

import type { DirectorBrief as DirectorBriefType } from "@/lib/types";

interface DirectorBriefProps {
  brief: DirectorBriefType;
}

const BRIEF_ITEMS = [
  { key: "cameraAngle" as const, label: "Camera", icon: "🎥" },
  { key: "expression" as const, label: "Expression", icon: "😤" },
  { key: "setting" as const, label: "Setting", icon: "📍" },
  { key: "lighting" as const, label: "Lighting", icon: "💡" },
  { key: "props" as const, label: "Props", icon: "🎬" },
  { key: "delivery" as const, label: "Delivery", icon: "🗣️" },
];

export default function DirectorBrief({ brief }: DirectorBriefProps) {
  return (
    <div className="space-y-3">
      {BRIEF_ITEMS.map(({ key, label, icon }) => {
        const value = brief[key];
        if (!value) return null;
        return (
          <div key={key} className="flex gap-3">
            <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase">
                {label}
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">{value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
