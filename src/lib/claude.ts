import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are ScrollStopper's Creative Director AI — a world-class Instagram Reels strategist who combines direct-response copywriting mastery with visual storytelling expertise.

You have deep knowledge of:
- Instagram algorithm mechanics: watch time, saves, shares, and completion rate are the key ranking signals. The first frame (hook) determines whether someone stops scrolling.
- Hook psychology frameworks: pattern interrupts, curiosity gaps, emotional triggers, open loops, contrarian takes, bold claims, social proof, urgency, and relatable humor.
- Visual composition for 9:16 vertical short-form video: camera angles, framing, text placement, color psychology, and thumbnail optimization.
- What makes someone STOP scrolling: unexpected visuals, direct eye contact, bold text that creates an incomplete thought, emotional expressions, and contextual settings that signal relevance.

You are the creative director — you show creators exactly what to film. You don't create generic templates. Every output is deeply tailored to the creator's specific niche, audience, and content style.

Hook text rules:
- Under 10 words — readable in a split second on a phone
- No generic filler: never use "game-changer", "revolutionary", "secret", "hack" (overused, triggers scroll-past)
- Match the niche's natural tone
- Every hook creates an incomplete thought the viewer must watch to resolve

CRITICAL: You MUST respond with raw valid JSON only. No markdown formatting. No \`\`\`json blocks. No extra text before or after. Just the JSON object.`;

function parseJSON(text: string) {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Strip markdown code blocks if present
    const stripped = text
      .replace(/^```(?:json)?\s*\n?/i, "")
      .replace(/\n?```\s*$/i, "")
      .trim();
    return JSON.parse(stripped);
  }
}

async function callClaudeWithRetry(
  messages: Anthropic.MessageParam[],
  maxTokens: number,
  retries = 2
) {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        system: SYSTEM_PROMPT,
        messages,
      });
      const text =
        message.content[0].type === "text" ? message.content[0].text : "";
      return parseJSON(text);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`Claude attempt ${attempt + 1} failed:`, lastError.message);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

export async function generateTopics(niche: string) {
  return callClaudeWithRetry(
    [
      {
        role: "user",
        content: `Generate 5 viral Instagram Reel hook topics for this niche: "${niche}"

Each hook should use a DIFFERENT framework from these (pick the 5 most relevant):
- Problem-agitation: Call out a specific pain point
- Curiosity gap: Tease an unexpected insight without revealing it
- Contrarian/myth-busting: Challenge a widely-held belief
- Bold claim / result: Lead with a specific, believable result
- Open loop: Start a story that demands completion
- "You" accusation: Directly call out the viewer
- Social proof / authority: Leverage credibility
- Time-sensitive / urgency: Create FOMO
- Hot take / polarizing: Take a strong stance
- Relatable / "caught in the act": Mirror the viewer's guilty behavior

Return JSON in this exact format:
{
  "topics": [
    {
      "id": 1,
      "hookLine": "the actual hook text (under 10 words)",
      "description": "2-3 sentence description of the reel concept",
      "framework": "which framework this uses",
      "whyItWorks": "1 sentence on why this stops scrolling for this niche"
    }
  ]
}`,
      },
    ],
    2048
  );
}

export async function generateHookTemplate(
  niche: string,
  topic: { hookLine: string; description: string }
) {
  return callClaudeWithRetry(
    [
      {
        role: "user",
        content: `Create a complete hook template package for this reel:

Niche: "${niche}"
Hook line: "${topic.hookLine}"
Concept: "${topic.description}"

Generate a comprehensive template with ALL of the following:

1. THREE IMAGE PROMPTS: Generate 3 different reference image prompts, each showing a DIFFERENT creative perspective for the same hook. Each should be a detailed prompt for generating a 9:16 (1080x1920) reference image that looks like a real Instagram reel's first frame.

The 3 variants MUST have clearly different perspectives:
- Variant 1: Focus on the PERSON — close-up or medium shot, strong facial expression, direct camera engagement, bold text overlay with the hook line
- Variant 2: Focus on the SETTING/CONTEXT — wider shot showing the environment, props, and scene that tells the story, with the person visible but the setting is the star, text overlay included
- Variant 3: Focus on DRAMA/ENERGY — dynamic angle (low angle, over-shoulder, Dutch tilt), dramatic lighting or composition, action/movement feel, text overlay included

Each prompt should be highly specific: describe the person, expression, clothing, setting, colors, text style, and composition in detail.

2. DIRECTOR'S BRIEF: Specific instructions for the creator to recreate this shot:
   - Camera angle
   - Expression/energy
   - Setting/background
   - Lighting
   - Props (null if none needed)
   - What to say and how to say it (tone, pacing, emphasis)

3. FULL REEL SCRIPT:
   - Hook (first 3 seconds — the opening line)
   - Body (main content — 20-40 seconds of value)
   - CTA (call to action — what you want the viewer to do)

4. CAPTION + HASHTAGS: Instagram-ready caption and 15-20 relevant hashtags

Return JSON in this exact format:
{
  "imagePrompts": [
    {
      "label": "Close-Up Portrait",
      "description": "Tight shot focused on expression and eye contact",
      "prompt": "detailed image generation prompt for variant 1"
    },
    {
      "label": "Scene & Setting",
      "description": "Wide shot showcasing the environment and props",
      "prompt": "detailed image generation prompt for variant 2"
    },
    {
      "label": "Dynamic Angle",
      "description": "Dramatic composition with bold energy",
      "prompt": "detailed image generation prompt for variant 3"
    }
  ],
  "directorBrief": {
    "cameraAngle": "specific camera angle instruction",
    "expression": "expression and energy direction",
    "setting": "setting and background details",
    "lighting": "lighting setup notes",
    "props": "prop instructions or null",
    "delivery": "what to say and how — tone, pacing, emphasis, specific performance notes"
  },
  "script": {
    "hook": "exact opening line (first 3 sec)",
    "body": "main content script (be specific, not generic)",
    "cta": "call to action"
  },
  "caption": "Instagram caption text",
  "hashtags": ["hashtag1", "hashtag2", "..."]
}`,
      },
    ],
    4096
  );
}
