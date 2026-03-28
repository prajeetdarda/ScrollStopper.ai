import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateTopics } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Sign in to generate hooks" }, { status: 401 });
  }

  try {
    const { niche } = await req.json();

    if (!niche || typeof niche !== "string" || niche.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a niche" },
        { status: 400 }
      );
    }

    const result = await generateTopics(niche.trim());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating topics:", error);
    return NextResponse.json(
      { error: "Failed to generate topics. Please try again." },
      { status: 500 }
    );
  }
}
