import { fal } from "@fal-ai/client";

const FAL_KEY = process.env.FAL_KEY;

if (!FAL_KEY && typeof window === "undefined") {
  console.warn("[fal-client] FAL_KEY not set. Image generation will fail.");
}

fal.config({
  credentials: FAL_KEY,
});

export interface GenerateImageOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numImages?: number;
  seed?: number;
  model?: "flux-pro" | "flux-dev" | "flux-schnell" | "stable-diffusion-v35-large" | "gpt-4o-image" | "gpt-image-2";
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: string;
  contentType: string;
}

const MODEL_ENDPOINTS: Record<string, string> = {
  "flux-pro": "fal-ai/flux-pro",
  "flux-dev": "fal-ai/flux/dev",
  "flux-schnell": "fal-ai/flux/schnell",
  "stable-diffusion-v35-large": "fal-ai/stable-diffusion-v35-large",
  "gpt-4o-image": "fal-ai/gpt-4o-image",
  "gpt-image-2": "fal-ai/openai/gpt-image-2",
};

/**
 * Generate an image using FAL AI.
 * Defaults to flux-dev for best quality/speed balance.
 */
export async function generateImage(
  options: GenerateImageOptions
): Promise<GeneratedImage[]> {
  const {
    prompt,
    negativePrompt,
    width = 1024,
    height = 576,
    numImages = 1,
    seed,
    model = "flux-dev",
  } = options;

  const endpoint = MODEL_ENDPOINTS[model];
  if (!endpoint) {
    throw new Error(`Unknown FAL model: ${model}`);
  }

  const result = await fal.subscribe(endpoint, {
    input: {
      prompt,
      negative_prompt: negativePrompt,
      image_size: {
        width,
        height,
      },
      num_images: numImages,
      ...(seed !== undefined ? { seed } : {}),
      enable_safety_checker: true,
      safety_tolerance: "2",
    },
    logs: false,
  });

  const images = result.data?.images ?? result.data?.output?.images ?? [];

  return images.map((img: unknown) => {
    const i = img as Record<string, unknown>;
    return {
      url: String(i.url ?? i.image_url ?? ""),
      width: Number(i.width ?? width),
      height: String(i.height ?? height),
      contentType: String(i.content_type ?? "image/jpeg"),
    };
  });
}

/**
 * Generate a blog hero image with a consistent scientific/medical style.
 */
export async function generateBlogHeroImage(params: {
  title: string;
  topic: string;
  style?: "scientific-illustration" | "medical-infographic" | "abstract-molecular" | "clinical-photography";
}): Promise<GeneratedImage[]> {
  const { title, topic, style = "scientific-illustration" } = params;

  const stylePrompts: Record<string, string> = {
    "scientific-illustration":
      "clean scientific illustration style, soft blue and white color palette, medical textbook aesthetic, minimal UI chrome, high detail, professional medical journal cover quality, no text, no words, no letters",
    "medical-infographic":
      "modern medical infographic style, flat design with depth, soft gradients, icons and diagrams, clean layout, professional healthcare visual, no text, no words, no letters",
    "abstract-molecular":
      "abstract molecular visualization, 3D rendered peptides and proteins, soft volumetric lighting, blue and teal color scheme, scientific beauty, macro photography style, no text, no words, no letters",
    "clinical-photography":
      "clinical photography style, soft studio lighting, medical equipment context, shallow depth of field, professional healthcare setting, warm neutral tones, no text, no words, no letters",
  };

  const basePrompt = `Professional medical illustration for a scientific blog article about ${topic}. ${title}. ${stylePrompts[style]}. Ultra high quality, 4K, sharp focus.`;

  return generateImage({
    prompt: basePrompt,
    negativePrompt:
      "text, words, letters, watermark, signature, blurry, low quality, amateur, cartoon, anime, sketch, doodle, ugly, deformed",
    width: 1200,
    height: 630,
    model: "flux-pro",
  });
}

/**
 * Generate an infographic-style image for data visualization.
 */
export async function generateInfographicImage(params: {
  subject: string;
  dataPoints: string[];
}): Promise<GeneratedImage[]> {
  const { subject, dataPoints } = params;

  const prompt = `Clean medical infographic showing ${subject}. Features: ${dataPoints.join(", ")}. Modern flat design with soft shadows, professional healthcare color palette (blues, teals, soft greens), clear visual hierarchy, icon-based, data visualization aesthetic. No text, no words, no letters, no numbers. Ultra high quality, 4K.`;

  return generateImage({
    prompt,
    negativePrompt:
      "text, words, letters, numbers, watermark, signature, blurry, low quality, cluttered, messy",
    width: 1024,
    height: 1024,
    model: "flux-pro",
  });
}

/**
 * Download a generated image to a local file path.
 */
export async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const { writeFile } = await import("node:fs/promises");
  await writeFile(outputPath, buffer);
}
