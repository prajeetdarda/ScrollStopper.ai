# 🛑 ScrollStopper.ai

AI-powered creative director for Instagram Reels. Generate scroll-stopping hook templates — reference images, director's briefs, full scripts, and ready-to-post captions — all tailored to your niche.

**The AI doesn't replace you. It shows you exactly what to film, and you bring it to life.**

## 🎬 What It Does

1. **Enter your niche** — "Fitness coach for busy moms", "Luxury real estate in Miami", etc.
2. **Pick from 5 AI-generated hooks** — each uses a different viral framework (curiosity gap, contrarian take, bold claim, etc.)
3. **Get a complete template package:**
   - 🖼️ Reference image(s) showing the ideal first frame of your reel
   - 🎥 Director's brief — camera angle, expression, setting, lighting, delivery notes
   - 📝 Full script — hook, body, and call to action
   - 📋 Caption and hashtags ready to copy-paste

## ⚙️ Tech Stack

- **Frontend** — Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Script & Hook Generation** — Claude API (Anthropic) with expert-level system prompts for Instagram creative direction
- **Image Generation** — GPT Image (OpenAI) or Gemini 2.5 Flash (Google), user-selectable with 1 or 3 image variants
- **Auth** — Clerk (Google OAuth)
- **Deployment** — Vercel

## 🚀 Getting Started

```bash
git clone https://github.com/prajeetdarda/ScrollStopper.ai.git
cd ScrollStopper.ai
npm install
```

Create a `.env.local` file in the root:

```env
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_google_ai_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

You need at least the Anthropic key + one image provider key (OpenAI or Google). Get Clerk keys from [clerk.com](https://clerk.com).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Main page — step-by-step flow
│   ├── layout.tsx                    # Root layout, dark theme, Clerk auth
│   └── api/
│       ├── generate-topics/route.ts  # Claude: niche -> 5 hook ideas
│       └── generate-hook/route.ts    # Claude + image gen: hook -> full template
├── components/
│   ├── NicheInput.tsx                # Niche input with example suggestions
│   ├── TopicSelector.tsx             # Hook selection cards + image settings
│   ├── HookTemplate.tsx              # Result view — images + collapsible details
│   ├── DirectorBrief.tsx             # Camera, lighting, expression notes
│   ├── ScriptDisplay.tsx             # Script + caption with copy buttons
│   └── LoadingState.tsx              # Generation loading animation
├── lib/
│   ├── claude.ts                     # Claude API with retry logic
│   ├── imageGen.ts                   # OpenAI + Gemini image generation
│   └── types.ts                      # TypeScript interfaces
└── proxy.ts                          # Clerk auth middleware
```

## 💰 Cost Notes

- **Claude (Anthropic)** — ~$0.01 per hook generation
- **GPT Image (OpenAI)** — ~$0.08 per image (1024x1536)
- **Gemini (Google)** — significantly cheaper, ~$0.003-0.005 per image
- **Clerk** — free up to 10,000 monthly active users

## 📄 License

MIT
