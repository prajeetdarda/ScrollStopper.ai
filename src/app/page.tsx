"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import type { HookTopic, HookTemplate as HookTemplateType, AppStep, ImageProvider } from "@/lib/types";
import NicheInput from "@/components/NicheInput";
import TopicSelector from "@/components/TopicSelector";
import HookTemplate from "@/components/HookTemplate";
import LoadingState from "@/components/LoadingState";
import InfiniteScrollBackground from "@/components/InfiniteScrollBackground";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [step, setStep] = useState<AppStep>("niche");
  const [niche, setNiche] = useState("");
  const [topics, setTopics] = useState<HookTopic[]>([]);
  const [template, setTemplate] = useState<HookTemplateType | null>(null);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNicheSubmit = async (inputNiche: string) => {
    setNiche(inputNiche);
    setError(null);
    setIsLoadingTopics(true);

    try {
      const res = await fetch("/api/generate-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: inputNiche }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate topics");
      }

      const data = await res.json();
      setTopics(data.topics);
      setStep("topics");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoadingTopics(false);
    }
  };

  const handleTopicSelect = async (topic: HookTopic, imageProvider: ImageProvider, imageCount: number = 1) => {
    setError(null);
    setStep("generating");

    try {
      const res = await fetch("/api/generate-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche,
          topic: { hookLine: topic.hookLine, description: topic.description },
          imageProvider,
          imageCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate hook template");
      }

      const data = await res.json();
      setTemplate(data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("topics");
    }
  };

  const handleStartOver = () => {
    setStep("niche");
    setNiche("");
    setTopics([]);
    setTemplate(null);
    setError(null);
  };

  const handleBackToTopics = () => {
    setStep("topics");
    setError(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <InfiniteScrollBackground />

        <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-zinc-300 font-medium">AI-Powered Content Creation</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Scroll
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Stopper
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
              Generate viral hook templates with AI. Get scripts, director
              briefs, and reference images — all tailored to your niche.
            </p>

            <SignInButton mode="modal">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Get Started Free
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
              </button>
            </SignInButton>

            <div className="flex flex-wrap gap-3 justify-center mt-12">
              {["Hook Scripts", "Director Briefs", "Reference Images", "Trend Analysis"].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-500 backdrop-blur-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="relative z-10 pb-6 pt-4 text-center space-y-1.5">
          <p className="text-xs text-zinc-600">
            ScrollStopper — AI is the director, you&apos;re the star
          </p>
          <p className="text-[13px] text-zinc-700">
            Built by{" "}
            <a href="https://prajeetdarda.github.io/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
              Prajeet Darda
            </a>
            {" "}&middot;{" "}
            <a href="https://github.com/prajeetdarda" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
              GitHub
            </a>
            {" "}&middot;{" "}
            <a href="https://www.linkedin.com/in/prajeet-darda" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {error && (
        <div className="w-full max-w-2xl mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {step === "niche" && (
        <NicheInput onSubmit={handleNicheSubmit} isLoading={isLoadingTopics} />
      )}

      {step === "topics" && (
        <TopicSelector
          topics={topics}
          niche={niche}
          onSelect={handleTopicSelect}
          onBack={handleStartOver}
          isLoading={false}
        />
      )}

      {step === "generating" && <LoadingState />}

      {step === "result" && template && (
        <HookTemplate template={template} onBack={handleBackToTopics} onStartOver={handleStartOver} />
      )}

      {/* Footer */}
      <footer className="mt-auto pt-12 pb-4 text-center space-y-1.5">
        <p className="text-xs text-zinc-600">
          ScrollStopper — AI is the director, you&apos;re the star
        </p>
        <p className="text-[13px] text-zinc-700">
          Built by{" "}
          <a href="https://prajeetdarda.github.io/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
            Prajeet Darda
          </a>
          {" "}&middot;{" "}
          <a href="https://github.com/prajeetdarda" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
            GitHub
          </a>
          {" "}&middot;{" "}
          <a href="https://www.linkedin.com/in/prajeet-darda" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400 transition-colors">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}
