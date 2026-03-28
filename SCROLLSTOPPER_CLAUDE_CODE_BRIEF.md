# ScrollStopper — Project Brief for Claude Code

## What We're Building

ScrollStopper is a web app that helps Instagram creators/coaches generate **scroll-stopping reel hook templates** — AI-generated reference images + scripts that show the creator exactly what to film, how to position the camera, what expression to make, and what to say. The creator then copies the template with their own face/voice.

**This is NOT a fully AI-generated content tool.** The AI acts as a creative director — it shows the creator a visual reference of the perfect hook, and they recreate it themselves. AI empowers the creator, it doesn't replace them.

## User Flow

1. **Input niche**: Creator types their niche (e.g., "fitness coach for busy moms", "real estate agent in Miami", "vegan nutritionist")
2. **Get 5 hook topics**: AI generates 5 viral reel topic ideas with hook lines tailored to that niche
3. **Pick one**: Creator selects a topic
4. **AI generates a hook template package**:
   - **A scroll-stopping reference image (9:16, 1080x1920)**: An AI-generated image showing what the first frame of their reel should look like — a person in the right camera angle, right setting, right expression, with bold text overlay showing the hook line. This is the visual template the creator will copy.
   - **Director's brief**: Specific instructions for the creator to recreate the shot:
     - Camera angle (close-up, wide, over-shoulder, low angle, etc.)
     - Expression/energy (shocked, confident, whispering, intense eye contact, etc.)
     - Setting/background suggestion (gym, kitchen, office, outdoor, etc.)
     - Lighting notes (natural light, ring light, dramatic shadows, etc.)
     - Props (only if it adds value — e.g., "hold a dumbbell mid-curl", "wave a $100 bill", "hold up your phone showing a DM". Skip if the hook is stronger without one)
     - What to say and how to say it (tone, pacing, emphasis)
   - **Full reel script**: Complete script beyond just the hook — Hook (first 3 sec) → Body (main content) → CTA (call to action)
   - **Caption + hashtags**: Ready-to-use Instagram caption and relevant hashtags

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **AI Script Generation**: Claude API (Anthropic) — generates hook topics, scripts, director's briefs, visual descriptions
- **Image Generation**: Support BOTH (let user or system choose):
  - GPT Image 1.5 (OpenAI API) — best text rendering in images
  - Gemini/Nano Banana (Google AI API) — free tier available
- **Deployment**: Vercel

## Architecture

```
[Next.js Frontend]
       |
       v
[API Route: /api/generate-topics]
  → Claude API: Takes niche, returns 5 hook topics with brief descriptions
       |
       v
[API Route: /api/generate-hook]
  → Claude API: Takes selected topic + niche, returns:
     - Detailed image generation prompt (describing the reference image)
     - Director's brief (camera, expression, setting, lighting, delivery)
     - Full reel script (hook → body → CTA)
     - Caption + hashtags
  → Image Gen API (GPT Image 1.5 or Nano Banana): Takes the image prompt, returns the reference image
       |
       v
[Frontend displays the complete hook template package]
```

## Image Generation — What the Reference Image Should Look Like

The AI-generated image should look like a real Instagram reel's first frame / thumbnail:
- **9:16 vertical format** (1080x1920)
- **A person** in the shot (AI-generated person acting as a stand-in template)
- **Bold, large text overlay** — the hook line in Instagram-style typography (outlined text, drop shadows, vibrant colors)
- **Contextual setting** — if it's a fitness hook, show a gym; cooking hook, show a kitchen; business hook, show an office
- **The camera angle and composition should demonstrate** what the creator needs to replicate
- **High energy, scroll-stopping composition** — the kind of image that makes you stop scrolling on Instagram
- **Props (when they add value)**: If a prop would strengthen the hook, include it — e.g., a fitness hook might show someone holding a dumbbell, a cooking hook might show someone holding a ridiculous amount of butter, a business hook might show someone waving cash. Props should feel natural and add to the scroll-stopping factor, NOT clutter the image. Most hooks won't need a prop. Only suggest one when it genuinely amplifies the hook's visual punch. The director's brief should also mention the prop if one is used, so the creator knows to grab it.

## Claude API Prompt Strategy

### System Prompt Expertise
Claude should roleplay as a creative director who combines direct-response copywriting expertise with Instagram visual storytelling. The system prompt should embody deep knowledge of:
- Instagram algorithm mechanics (watch time, saves, shares as ranking signals)
- Hook psychology and proven frameworks
- Visual composition for vertical short-form video
- The specific niche the creator is in
- What makes someone STOP scrolling (pattern interrupts, emotional triggers, curiosity gaps)

### Hook Generation Frameworks
When generating hook topics, Claude should draw from these proven frameworks (not use them all every time — pick the 5 most relevant for the niche):
- **Problem-agitation**: Call out a specific pain point the audience feels right now ("You're stretching wrong and it's making things worse")
- **Curiosity gap**: Tease an unexpected insight without revealing it ("The exercise doctors are quietly recommending to every patient")
- **Contrarian/myth-busting**: Challenge a widely-held belief in the niche ("Stop drinking 8 glasses of water a day")
- **Bold claim / result**: Lead with a specific, believable result ("I lost 12 lbs in 6 weeks eating pasta every day")
- **Open loop**: Start a story that demands completion ("A client texted me at 2am and what she said changed my entire program")
- **"You" accusation**: Directly call out the viewer ("You're doing squats wrong and your knees know it")
- **Social proof / authority**: Leverage credibility ("After training 200+ moms, here's what actually works")
- **Time-sensitive / urgency**: Create FOMO ("This workout hack works but most trainers won't teach it")
- **Hot take / polarizing**: Take a strong stance ("Yoga is a waste of time for weight loss. Fight me.")
- **Relatable / "caught in the act"**: Mirror the viewer's guilty behavior ("POV: You said you'd work out today but you're watching this instead")

### Hook Text Rules
- Keep hook text to **under 10 words** — it needs to be readable in a split second on a phone screen
- Avoid generic filler words like "game-changer", "revolutionary", "secret", "hack" (overused, triggers scroll-past)
- Match the niche's natural tone — a fitness coach sounds different from a luxury real estate agent
- Every hook should create an **incomplete thought** that the viewer needs to watch to resolve

### Output Format
All Claude responses should be structured JSON for easy parsing by the frontend.

## UI/UX Requirements

- **Clean, modern, Instagram-inspired aesthetic** — dark mode preferred, bold typography
- **Step-by-step flow**: Niche input → Topic selection (cards) → Generated hook template display
- **The reference image should be the hero** — big, prominent, center of the output
- **Director's brief should feel like professional production notes** — clear, actionable, not verbose
- **Download button** for the reference image
- **Copy buttons** for script, caption, hashtags
- **Mobile-responsive** — many creators will view this on their phones

## Key Design Principles

1. **Output quality is everything** — the reference image and script must look/feel professional, not generic AI slop
2. **Speed matters** — the app should feel fast and responsive, show loading states during generation
3. **Creator-centric** — language should always frame AI as the assistant/director, creator as the star
4. **Niche-specific** — every output should feel deeply tailored to the creator's specific niche, not generic

## Environment Variables Needed

```
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=
```

## File Structure (suggested)

```
scrollstopper/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main app page (step-by-step flow)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   └── api/
│   │       ├── generate-topics/route.ts  # Claude: niche → 5 topics
│   │       └── generate-hook/route.ts    # Claude + Image Gen: topic → full template
│   ├── components/
│   │   ├── NicheInput.tsx              # Step 1: niche input
│   │   ├── TopicSelector.tsx           # Step 2: pick from 5 topics  
│   │   ├── HookTemplate.tsx           # Step 3: display generated template
│   │   ├── DirectorBrief.tsx           # Director's notes display
│   │   ├── ScriptDisplay.tsx           # Full script display
│   │   └── LoadingState.tsx            # Generation loading UI
│   ├── lib/
│   │   ├── claude.ts                   # Claude API helper
│   │   ├── imageGen.ts                 # Image generation helper (supports both OpenAI + Gemini)
│   │   └── types.ts                    # TypeScript types
│   └── ...
├── public/
│   └── ...
├── .env.local
├── package.json
└── ...
```

## Priority Order for Building

1. **First**: Claude API integration — get niche → topics → scripts working with great prompt engineering
2. **Second**: Image generation integration — get reference images generating from Claude's visual descriptions
3. **Third**: Frontend UI — clean, beautiful step-by-step flow
4. **Fourth**: Polish — loading states, error handling, mobile responsiveness, pre-generated examples

## What Success Looks Like

A creator types "fitness coach for busy moms" and within 30-60 seconds gets back:
- A stunning 9:16 reference image of a person in a gym, close-up shot, surprised expression, with bold text "YOUR BABY IS WATCHING YOU SKIP LEG DAY" overlaid
- A director's brief saying "Film close-up, eye level, in your gym or home workout area. Start with a deadpan look, then break into a smile. Natural lighting, phone propped at eye height."
- A complete script: "Hook: 'Your baby is watching you skip leg day.' Body: 'Here are 3 exercises you can do with your baby in 10 minutes...' CTA: 'Follow for more mom-friendly workouts'"
- Caption and hashtags ready to copy-paste

The creator looks at this and thinks: "I know exactly what to film now. Let me go copy this."
