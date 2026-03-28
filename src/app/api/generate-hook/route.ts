import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateHookTemplate } from "@/lib/claude";
import { generateImage } from "@/lib/imageGen";
import type { ImageProvider } from "@/lib/types";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Sign in to generate hooks" }, { status: 401 });
  }

  try {
    const { niche, topic, imageProvider = "openai", imageCount = 1 } = await req.json();

    if (!niche || !topic) {
      return NextResponse.json(
        { error: "Missing niche or topic" },
        { status: 400 }
      );
    }

    const template = await generateHookTemplate(niche, topic);

    // Use only the requested number of image prompts
    const promptsToUse = template.imagePrompts.slice(0, imageCount);

    // Generate images in parallel
    const imageResults = await Promise.allSettled(
      promptsToUse.map(
        (ip: { label: string; description: string; prompt: string }) =>
          generateImage(ip.prompt, imageProvider as ImageProvider)
      )
    );

    const imageVariants = promptsToUse.map(
      (
        ip: { label: string; description: string; prompt: string },
        i: number
      ) => ({
        label: ip.label,
        description: ip.description,
        imageUrl:
          imageResults[i].status === "fulfilled"
            ? imageResults[i].value
            : "",
      })
    );

    return NextResponse.json({
      imageVariants,
      directorBrief: template.directorBrief,
      script: template.script,
      caption: template.caption,
      hashtags: template.hashtags,
    });
  } catch (error) {
    console.error("Error generating hook:", error);
    return NextResponse.json(
      { error: "Failed to generate hook template. Please try again." },
      { status: 500 }
    );
  }
}
