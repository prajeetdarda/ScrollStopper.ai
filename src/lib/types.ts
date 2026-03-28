export interface HookTopic {
  id: number;
  hookLine: string;
  description: string;
  framework: string;
  whyItWorks: string;
}

export interface DirectorBrief {
  cameraAngle: string;
  expression: string;
  setting: string;
  lighting: string;
  props: string | null;
  delivery: string;
}

export interface ReelScript {
  hook: string;
  body: string;
  cta: string;
}

export interface ImageVariant {
  label: string;
  description: string;
  imageUrl: string;
}

export interface HookTemplate {
  imageVariants: ImageVariant[];
  directorBrief: DirectorBrief;
  script: ReelScript;
  caption: string;
  hashtags: string[];
}

export type ImageProvider = "openai" | "gemini";

export type AppStep = "niche" | "topics" | "generating" | "result";
