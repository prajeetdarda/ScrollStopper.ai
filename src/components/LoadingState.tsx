"use client";

const LOADING_MESSAGES = [
  "Channeling your inner creative director...",
  "Crafting the perfect hook...",
  "Designing your scroll-stopping moment...",
  "Building your reference template...",
  "Making Instagram jealous...",
];

export default function LoadingState() {
  const message =
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  return (
    <div className="w-full max-w-2xl mx-auto text-center py-20">
      <div className="relative mx-auto w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-pink-500 animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">
        Generating Your Hook Template
      </h2>
      <p className="text-zinc-400 animate-pulse">{message}</p>
      <p className="text-xs text-zinc-600 mt-4">
        This typically takes 15-30 seconds
      </p>
    </div>
  );
}
