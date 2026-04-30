const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");

const FAL_KEY = "b959c6ba-36be-4e4d-bc8a-f9ef1ef89491:d6eab4ec1f3b23235aaffb53ef2371b5";
fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join(__dirname, "public", "images", "nb-landing");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ENDPOINT = "fal-ai/flux-pro";

async function generate(prompt, filename, width = 1024, height = 1024) {
  console.log(`\n Generating: ${filename}`);
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
  console.log(`   \u2705 Saved ${(buffer.length / 1024).toFixed(1)} KB`);
  return outPath;
}

async function main() {
  const tasks = [
    // 1. Peptide Detail - molecular helix
    generate(
      `A minimalist 3D rendered peptide alpha-helix structure floating in space. The helix is made of thin black wireframe lines with a few bright neon yellow-green accent atoms. Clean white background. Scientific diagram style, neobrutalist aesthetic, high contrast, no text, no labels, no logos, square composition.`,
      "mol-helix.png", 800, 800
    ),

    // 2. Blog Post hero - research/lab notebook
    generate(
      `A flat lay photograph of a researcher's desk: an open minimal notebook with hand-drawn chemical structures in black ink on cream paper, a single glass test tube with bright yellow-green liquid resting on the notebook, and a black pen. The surface is raw concrete gray. Shot from directly above. Minimal, neobrutalist aesthetic, soft natural lighting, no people, no text, no logos.`,
      "blog-research.png", 1200, 630
    ),

    // 3. Stacks page - interlocking geometric
    generate(
      `Abstract minimalist geometric composition: three rectangular blocks stacked and offset in space, like a minimalist sculpture. The blocks are solid black, solid concrete gray, and solid cream off-white. Clean negative space around them. Isometric angle, soft shadow on the floor. Neobrutalist architectural aesthetic, no text, no logos, square format.`,
      "stacks-hero.png", 1024, 1024
    ),

    // 4. Pets subdomain - dog/cat silhouette
    generate(
      `Minimalist high-contrast silhouette of a dog and cat sitting side by side, facing forward, viewed from straight on. Solid black shapes on a warm cream off-white background. Simple, clean, graphic design style. No details, no eyes, no fur texture, just pure silhouette. Neobrutalist aesthetic, square format, no text.`,
      "pets-hero.png", 800, 800
    ),

    // 5. Labs subdomain - experimental tools
    generate(
      `Minimalist flat lay of laboratory tools on a dark charcoal gray surface: a pipette, a small glass vial, a petri dish, and a microcentrifuge tube. All items arranged in a neat grid. The only color is a bright neon yellow-green liquid in the vial and a small dot in the petri dish. Otherwise black and white. Shot from above. Clean, scientific, neobrutalist, no text, no logos.`,
      "labs-hero.png", 1024, 768
    ),

    // 6. Compare page - split/balance visual
    generate(
      `Minimalist geometric composition: two tall rectangular columns of equal height and width standing side by side on a concrete floor. One column is solid black, the other is solid off-white. A thin neon bright yellow-green horizontal line connects them at midpoint. Clean white background above. Architectural photography style, neobrutalist aesthetic, no text, no logos, square format.`,
      "compare-hero.png", 800, 800
    ),
  ];

  for (const t of tasks) {
    try { await t; } catch (err) { console.error(`\u274c ${err.message}`); }
  }
  console.log("\n Done!");
}

main().catch(console.error);
