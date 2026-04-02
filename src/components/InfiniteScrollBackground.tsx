"use client";

import { useState, memo } from "react";

interface ScrollCard {
  image: string;
  label: string;
  bgFrom: string;
  bgTo: string;
}

const ROWS: ScrollCard[][] = [
  [
    { image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=260&fit=crop&auto=format&q=60", label: "Social Media", bgFrom: "#7c3aed", bgTo: "#db2777" },
    { image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=260&fit=crop&auto=format&q=60", label: "Video Production", bgFrom: "#2563eb", bgTo: "#0891b2" },
    { image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=260&fit=crop&auto=format&q=60", label: "Content Creator", bgFrom: "#ea580c", bgTo: "#dc2626" },
    { image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&h=260&fit=crop&auto=format&q=60", label: "Neon Creative", bgFrom: "#7c3aed", bgTo: "#4f46e5" },
    { image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=260&fit=crop&auto=format&q=60", label: "Engagement", bgFrom: "#db2777", bgTo: "#e11d48" },
    { image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=260&fit=crop&auto=format&q=60", label: "Creative Studio", bgFrom: "#059669", bgTo: "#0d9488" },
    { image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=260&fit=crop&auto=format&q=60", label: "Technology", bgFrom: "#0ea5e9", bgTo: "#6366f1" },
  ],
  [
    { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=260&fit=crop&auto=format&q=60", label: "Studio Setup", bgFrom: "#d97706", bgTo: "#ca8a04" },
    { image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=400&h=260&fit=crop&auto=format&q=60", label: "Camera Gear", bgFrom: "#0284c7", bgTo: "#2563eb" },
    { image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=260&fit=crop&auto=format&q=60", label: "YouTube", bgFrom: "#dc2626", bgTo: "#ea580c" },
    { image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=260&fit=crop&auto=format&q=60", label: "Strategy", bgFrom: "#4f46e5", bgTo: "#7c3aed" },
    { image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=260&fit=crop&auto=format&q=60", label: "Motivation", bgFrom: "#c026d3", bgTo: "#db2777" },
    { image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=260&fit=crop&auto=format&q=60", label: "Abstract Art", bgFrom: "#0891b2", bgTo: "#059669" },
    { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=260&fit=crop&auto=format&q=60", label: "Analytics", bgFrom: "#2563eb", bgTo: "#7c3aed" },
  ],
  [
    { image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=260&fit=crop&auto=format&q=60", label: "Mobile Video", bgFrom: "#e11d48", bgTo: "#db2777" },
    { image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=260&fit=crop&auto=format&q=60", label: "Film Editing", bgFrom: "#0d9488", bgTo: "#0891b2" },
    { image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=260&fit=crop&auto=format&q=60", label: "Social Icons", bgFrom: "#7c3aed", bgTo: "#a855f7" },
    { image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=260&fit=crop&auto=format&q=60", label: "Workspace", bgFrom: "#4f46e5", bgTo: "#2563eb" },
    { image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=260&fit=crop&auto=format&q=60", label: "Color Grading", bgFrom: "#ea580c", bgTo: "#d97706" },
    { image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=400&h=260&fit=crop&auto=format&q=60", label: "Inspiration", bgFrom: "#db2777", bgTo: "#c026d3" },
    { image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=260&fit=crop&auto=format&q=60", label: "Creative Team", bgFrom: "#059669", bgTo: "#0d9488" },
  ],
  [
    { image: "https://images.unsplash.com/photo-1551817958-20204d6ab212?w=400&h=260&fit=crop&auto=format&q=60", label: "Editing Suite", bgFrom: "#059669", bgTo: "#16a34a" },
    { image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=260&fit=crop&auto=format&q=60", label: "Influencer", bgFrom: "#7c3aed", bgTo: "#8b5cf6" },
    { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=260&fit=crop&auto=format&q=60", label: "Brainstorm", bgFrom: "#ca8a04", bgTo: "#ea580c" },
    { image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=400&h=260&fit=crop&auto=format&q=60", label: "Trending", bgFrom: "#dc2626", bgTo: "#e11d48" },
    { image: "https://images.unsplash.com/photo-1585247226801-bc613c441316?w=400&h=260&fit=crop&auto=format&q=60", label: "Cinematography", bgFrom: "#0284c7", bgTo: "#0891b2" },
    { image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=260&fit=crop&auto=format&q=60", label: "Product Shot", bgFrom: "#6366f1", bgTo: "#4f46e5" },
    { image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=260&fit=crop&auto=format&q=60", label: "Storytelling", bgFrom: "#a855f7", bgTo: "#c026d3" },
  ],
  [
    { image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=260&fit=crop&auto=format&q=60", label: "Platforms", bgFrom: "#2563eb", bgTo: "#7c3aed" },
    { image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=260&fit=crop&auto=format&q=60", label: "Viral Content", bgFrom: "#0891b2", bgTo: "#2563eb" },
    { image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=260&fit=crop&auto=format&q=60", label: "Broadcast", bgFrom: "#4f46e5", bgTo: "#0ea5e9" },
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=260&fit=crop&auto=format&q=60", label: "Collaboration", bgFrom: "#d97706", bgTo: "#ea580c" },
    { image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=400&h=260&fit=crop&auto=format&q=60", label: "Aesthetic", bgFrom: "#e11d48", bgTo: "#dc2626" },
    { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=260&fit=crop&auto=format&q=60", label: "Innovation", bgFrom: "#8b5cf6", bgTo: "#c026d3" },
    { image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=260&fit=crop&auto=format&q=60", label: "Photography", bgFrom: "#0d9488", bgTo: "#059669" },
  ],
];

const ROW_CONFIGS = [
  { speed: 45, direction: "left" },
  { speed: 38, direction: "right" },
  { speed: 50, direction: "left" },
  { speed: 34, direction: "right" },
  { speed: 42, direction: "left" },
] as const;

const CardImage = memo(function CardImage({ card }: { card: ScrollCard }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="relative w-[280px] h-[180px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.06]"
      style={{ background: `linear-gradient(135deg, ${card.bgFrom}, ${card.bgTo})` }}
    >
      {!error && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      <span className="absolute bottom-3 left-3.5 text-white/80 text-[11px] font-semibold tracking-wider uppercase">
        {card.label}
      </span>
    </div>
  );
});

export default function InfiniteScrollBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute flex flex-col gap-5 justify-center -rotate-12"
        style={{ inset: "-50%" }}
      >
        {ROWS.map((row, i) => {
          const { speed, direction } = ROW_CONFIGS[i];
          return (
            <div key={i} className="scroll-row flex overflow-hidden">
              <div
                className="scroll-content flex gap-5"
                style={{
                  width: "max-content",
                  animation: `scroll-${direction} ${speed}s linear infinite`,
                }}
              >
                {[...row, ...row].map((card, j) => (
                  <CardImage key={`${i}-${j}`} card={card} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-zinc-950/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.75) 50%, rgba(9,9,11,0.97) 80%)",
        }}
      />
    </div>
  );
}
