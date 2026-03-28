# ScrollStopper.ai

AI-powered hook templates for Instagram Reels. Enter your niche, get scroll-stopping reference images, director's briefs, scripts, and captions — ready to film.

## How It Works

1. **Enter your niche** (e.g., "Fitness coach for busy moms over 30")
2. **Pick a hook** from 5 AI-generated viral hook ideas
3. **Get your template** — reference image(s), director's brief, full script, caption & hashtags

AI is the creative director. You're the star.

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Script Generation**: Claude API (Anthropic)
- **Image Generation**: GPT Image (OpenAI) or Gemini (Google)

## Setup

```bash
npm install
```

Create `.env.local`:

```
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key
GOOGLE_AI_API_KEY=your_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
