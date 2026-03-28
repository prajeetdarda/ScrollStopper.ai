"use client";

import { useState } from "react";
import type { HookTopic, HookTemplate as HookTemplateType, AppStep, ImageProvider } from "@/lib/types";
import NicheInput from "@/components/NicheInput";
import TopicSelector from "@/components/TopicSelector";
import HookTemplate from "@/components/HookTemplate";
import LoadingState from "@/components/LoadingState";

export default function Home() {
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
