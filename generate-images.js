const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");

const FAL_KEY = "b959c6ba-36be-4e4d-bc8a-f9ef1ef89491:d6eab4ec1f3b23235aaffb53ef2371b5";

fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join(__dirname, "public", "images", "nb-landing");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ENDPOINT = "fal-ai/flux-pro";

async function generate(prompt, filename, width = 1024, height = 1024) {
  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`   ${prompt.slice(0, 90)}...`);

  const result = await fal.subscribe(ENDPOINT, {
    input: {
      prompt,
      image_size: { width, height },
      num_images: 1,
      enable_safety_checker: true,
      safety_tolerance: "2",
    },
    logs: false,
  });

  const images = result.data?.images ?? result.data?.output?.images ?? [];
  if (!images.length) throw new Error(`No images for ${filename}`);

  const url = images[0].url ?? images[0].image_url;
  const outPath = path.join(OUTPUT_DIR, filename);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  console.log(`   ✅ Saved ${(buffer.length / 1024).toFixed(1)} KB`);
  return outPath;
}

async function main() {
  const tasks = [
    generate(
      `A single scientific peptide research vial standing upright on a raw concrete block. The vial is clear glass with a black rubber stopper and aluminum crimp cap. It contains a bright neon yellow-green liquid filling about one third of the vial. A minimal white paper label wraps around the vial with thin black horizontal lines suggesting text. The background is a solid warm off-white color. Studio product photography, sharp focus, soft diffused lighting from the left, minimal shadows, neobrutalist aesthetic, no text, no logos, high detail, 4K quality.`,
      "hero-vial.png", 1024, 1280
    ),
    generate(
      `A cropped close-up of an ancient Greek marble statue bust, showing only the neck, jawline, and lower face. Classical sculpture style. Pure black and white, high contrast, dramatic side lighting creating deep shadows. The bust fades into a solid off-white background on the right side. Museum photography, fine art, minimal, elegant, no color, no text.`,
      "classical-bust.png", 800, 1200
    ),
    generate(
      `A scientific laboratory bench in grayscale. On the bench: a professional microscope on the left, a glass beaker with bright yellow-green liquid in the center, and a test tube rack with three glass test tubes on the right. The bench surface is raw concrete gray. Clean, minimal, neobrutalist aesthetic. Soft overhead lighting. No people. No text. No labels. Product photography style, high detail, 4K.`,
      "lab-bench.png", 1024, 768
    ),
    generate(
      `Abstract minimalist geometric pattern of concentric rectangles, hand-drawn thin black ink lines on warm off-white paper texture. The rectangles are imperfect, slightly wobbly, like a quick sketch. Very sparse, lots of negative space. Neobrutalist art style, architectural drawing aesthetic, no color, no text.`,
      "tex-weight-loss.png", 512, 512
    ),
    generate(
      `Abstract minimalist diagonal grid pattern, hand-drawn thin black ink lines crossing at 45 degrees on warm off-white paper texture. The grid lines are slightly irregular and organic, not perfectly straight. Very sparse, lots of negative space. Neobrutalist art style, architectural sketch aesthetic, no color, no text.`,
      "tex-performance.png", 512, 512
    ),
    generate(
      `Abstract minimalist pattern of small black dots arranged in expanding concentric circles, hand-drawn ink dots on warm off-white paper texture. The dots vary slightly in size and are imperfectly placed. Very sparse, lots of negative space. Neobrutalist art style, scientific diagram aesthetic, no color, no text.`,
      "tex-recovery.png", 512, 512
    ),
    generate(
      `Abstract minimalist wave pattern, horizontal hand-drawn thin black ink sine waves on warm off-white paper texture. The waves are slightly irregular and organic, varying in amplitude. Very sparse, lots of negative space. Neobrutalist art style, sound wave diagram aesthetic, no color, no text.`,
      "tex-anti-aging.png", 512, 512
    ),
  ];

  for (const t of tasks) {
    try { await t; } catch (err) { console.error(`❌ ${err.message}`); }
  }
  console.log("\n🎉 Done!");
}

main().catch(console.error);
