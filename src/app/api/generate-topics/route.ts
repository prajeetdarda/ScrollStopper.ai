import { NextRequest, NextResponse } from "next/server";
import { generateTopics } from "@/lib/claude";

export async function POST(req: NextRequest) {
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
