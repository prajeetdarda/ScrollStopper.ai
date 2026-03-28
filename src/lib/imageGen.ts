import OpenAI from "openai";
import type { ImageProvider } from "./types";

export async function generateImage(
  prompt: string,
  provider: ImageProvider = "openai"
): Promise<string> {
  if (provider === "openai") {
    return generateWithOpenAI(prompt);
  } else {
    return generateWithGemini(prompt);
  }
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const fullPrompt = `Create a vertical 9:16 Instagram Reel thumbnail/first frame reference image. This should look like a real Instagram reel screenshot. ${prompt}

IMPORTANT: The text overlay must be large, bold, and clearly readable. Use Instagram-style typography with outlined text, drop shadows, or vibrant colored text that pops against the background. The text should be positioned in the upper or center portion of the frame for maximum visibility.`;

  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt: fullPrompt,
    n: 1,
    size: "1024x1536",
  });

  const imageData = response.data?.[0];
  if (!imageData) {
    throw new Error("No image returned from OpenAI");
  }

  if (imageData.b64_json) {
    return `data:image/png;base64,${imageData.b64_json}`;
  }
  if (imageData.url) {
    return imageData.url;
  }
  throw new Error("No image data returned from OpenAI");
}

const GEMINI_IMAGE_MODELS = [
  "gemini-2.5-flash-image",
];

async function tryGeminiModel(
  model: string,
  prompt: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseModalities: ["image", "text"],
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini model ${model} failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;
  const imagePart = parts?.find(
    (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData
  );

  if (!imagePart?.inlineData) {
    throw new Error(`Gemini model ${model} returned no image data`);
  }

  const mimeType = imagePart.inlineData.mimeType || "image/png";
  return `data:${mimeType};base64,${imagePart.inlineData.data}`;
}

async function tryImagen(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "9:16",
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Imagen failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const imageBytes = data.predictions?.[0]?.bytesBase64Encoded;
  if (!imageBytes) {
    throw new Error("Imagen returned no image data");
  }

  return `data:image/png;base64,${imageBytes}`;
}

async function generateWithGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_AI_API_KEY not set");

  const fullPrompt = `Generate an image: A vertical 9:16 Instagram Reel thumbnail/first frame reference image. This should look like a real Instagram reel screenshot. ${prompt}

IMPORTANT: The text overlay must be large, bold, and clearly readable. Use Instagram-style typography with outlined text, drop shadows, or vibrant colored text that pops against the background.`;

  const errors: string[] = [];

  // Try each Gemini image model
  for (const model of GEMINI_IMAGE_MODELS) {
    try {
      console.log(`Trying Gemini model: ${model}`);
      return await tryGeminiModel(model, fullPrompt, apiKey);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(msg);
      errors.push(msg);
    }
  }

  // Fallback: try Imagen 3
  try {
    console.log("Trying Imagen 3 fallback");
    return await tryImagen(fullPrompt, apiKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(msg);
    errors.push(msg);
  }

  throw new Error(`All Google image models failed:\n${errors.join("\n")}`);
}
