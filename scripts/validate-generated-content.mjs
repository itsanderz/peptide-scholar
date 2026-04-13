import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const GENERATED_ROOT = join(process.cwd(), "src", "data", "generated");
const VALID_CONTENT_TYPES = new Set(["treatment-hub", "cost", "app-landing"]);
const VALID_REVIEW_STATES = new Set([
  "draft",
  "generated",
  "generated-noindex",
  "reviewed-indexable",
  "monetizable",
  "deprecated",
]);
const VALID_CLAIM_TYPES = new Set([
  "clinical",
  "regulatory",
  "pricing",
  "provider",
  "safety",
  "market",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function walkJsonFiles(root) {
  const files = [];

  for (const entry of readdirSync(root)) {
    const absolute = join(root, entry);
    const stats = statSync(absolute);

    if (stats.isDirectory()) {
      files.push(...walkJsonFiles(absolute));
      continue;
    }

    if (entry.endsWith(".json")) {
      files.push(absolute);
    }
  }

  return files;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateSourceList(sources, filePath) {
  assert(Array.isArray(sources) && sources.length > 0, `${filePath}: sources must be a non-empty array`);

  const ids = new Set();
  for (const source of sources) {
    assert(isNonEmptyString(source.id), `${filePath}: source id is required`);
    assert(!ids.has(source.id), `${filePath}: duplicate source id '${source.id}'`);
    ids.add(source.id);
    assert(isNonEmptyString(source.authority), `${filePath}: source authority is required`);
    assert(isNonEmptyString(source.title), `${filePath}: source title is required`);
    assert(isNonEmptyString(source.url), `${filePath}: source url is required`);
    assert(VALID_CLAIM_TYPES.has(source.claimType), `${filePath}: invalid claimType '${source.claimType}'`);

    const url = new URL(source.url);
    assert(url.protocol === "https:", `${filePath}: source url must use https (${source.url})`);
  }
}

function validateMeta(meta, filePath) {
  assert(meta && typeof meta === "object", `${filePath}: meta block is required`);
  assert(isNonEmptyString(meta.id), `${filePath}: meta.id is required`);
  assert(isNonEmptyString(meta.slug), `${filePath}: meta.slug is required`);
  assert(isNonEmptyString(meta.locale), `${filePath}: meta.locale is required`);
  assert(isNonEmptyString(meta.market), `${filePath}: meta.market is required`);
  assert(VALID_REVIEW_STATES.has(meta.reviewState), `${filePath}: invalid reviewState '${meta.reviewState}'`);
  assert(isNonEmptyString(meta.monetizationState), `${filePath}: meta.monetizationState is required`);
  assert(typeof meta.indexable === "boolean", `${filePath}: meta.indexable must be boolean`);
  assert(isNonEmptyString(meta.lastUpdated), `${filePath}: meta.lastUpdated is required`);
  assert(VALID_CONTENT_TYPES.has(meta.contentType), `${filePath}: unsupported contentType '${meta.contentType}'`);
}

function validateSeo(seo, filePath, expectedPrefix) {
  assert(seo && typeof seo === "object", `${filePath}: seo block is required`);
  assert(isNonEmptyString(seo.title), `${filePath}: seo.title is required`);
  assert(isNonEmptyString(seo.description), `${filePath}: seo.description is required`);
  assert(isStringArray(seo.keywords), `${filePath}: seo.keywords must be a non-empty string array`);
  assert(
    isNonEmptyString(seo.canonicalPath) && seo.canonicalPath.startsWith(expectedPrefix),
    `${filePath}: canonicalPath must start with '${expectedPrefix}'`
  );
}

function validateTrust(trust, sources, filePath) {
  assert(trust && typeof trust === "object", `${filePath}: trust block is required`);
  assert(isNonEmptyString(trust.reviewedAt), `${filePath}: trust.reviewedAt is required`);
  assert(typeof trust.sourceCount === "number", `${filePath}: trust.sourceCount must be numeric`);
  assert(isNonEmptyString(trust.disclaimer), `${filePath}: trust.disclaimer is required`);
  assert(trust.sourceCount === sources.length, `${filePath}: trust.sourceCount must match sources.length`);
}

function validateFaqs(faqs, filePath) {
  assert(Array.isArray(faqs) && faqs.length > 0, `${filePath}: faqs must be a non-empty array`);
  for (const item of faqs) {
    assert(item && typeof item === "object", `${filePath}: faq item must be an object`);
    assert(isNonEmptyString(item.question), `${filePath}: faq question is required`);
    assert(isNonEmptyString(item.answer), `${filePath}: faq answer is required`);
  }
}

function validateCta(cta, filePath) {
  assert(cta && typeof cta === "object", `${filePath}: cta block is required`);
  assert(isNonEmptyString(cta.primaryLabel), `${filePath}: cta.primaryLabel is required`);
  assert(isNonEmptyString(cta.primaryHref), `${filePath}: cta.primaryHref is required`);
  if (cta.secondaryLabel !== undefined) {
    assert(isNonEmptyString(cta.secondaryLabel), `${filePath}: cta.secondaryLabel must be a string`);
  }
  if (cta.secondaryHref !== undefined) {
    assert(isNonEmptyString(cta.secondaryHref), `${filePath}: cta.secondaryHref must be a string`);
  }
}

function validateTreatmentHubAsset(asset, filePath) {
  validateMeta(asset.meta, filePath);
  validateSeo(asset.seo, filePath, "/treatments/");
  validateTrust(asset.trust, asset.sources, filePath);
  validateFaqs(asset.faqs, filePath);
  validateCta(asset.cta, filePath);
  validateSourceList(asset.sources, filePath);

  assert(asset.meta.contentType === "treatment-hub", `${filePath}: contentType must be 'treatment-hub'`);
  assert(isNonEmptyString(asset.treatmentSlug), `${filePath}: treatmentSlug is required`);
  assert(isNonEmptyString(asset.treatmentName), `${filePath}: treatmentName is required`);
  assert(isNonEmptyString(asset.marketSummary), `${filePath}: marketSummary is required`);
  assert(isNonEmptyString(asset.overview), `${filePath}: overview is required`);
  assert(isStringArray(asset.benefits), `${filePath}: benefits must be a non-empty string array`);
  assert(isStringArray(asset.sideEffects), `${filePath}: sideEffects must be a non-empty string array`);
  assert(isStringArray(asset.routes), `${filePath}: routes must be a non-empty string array`);
  assert(isNonEmptyString(asset.costSummary), `${filePath}: costSummary is required`);
  assert(isNonEmptyString(asset.providerSummary), `${filePath}: providerSummary is required`);
  assert(isNonEmptyString(asset.appSummary), `${filePath}: appSummary is required`);
  assert(Array.isArray(asset.approvedProducts) && asset.approvedProducts.length > 0, `${filePath}: approvedProducts must be a non-empty array`);

  for (const product of asset.approvedProducts) {
    assert(product && typeof product === "object", `${filePath}: approved product must be an object`);
    assert(isNonEmptyString(product.slug), `${filePath}: approved product slug is required`);
    assert(isNonEmptyString(product.name), `${filePath}: approved product name is required`);
    assert(isNonEmptyString(product.summary), `${filePath}: approved product summary is required`);
  }
}

function validateCostAsset(asset, filePath) {
  validateMeta(asset.meta, filePath);
  validateSeo(asset.seo, filePath, "/costs/");
  validateTrust(asset.trust, asset.sources, filePath);
  validateFaqs(asset.faqs, filePath);
  validateCta(asset.cta, filePath);
  validateSourceList(asset.sources, filePath);

  assert(asset.meta.contentType === "cost", `${filePath}: contentType must be 'cost'`);
  assert(isNonEmptyString(asset.treatmentSlug), `${filePath}: treatmentSlug is required`);
  assert(isNonEmptyString(asset.treatmentName), `${filePath}: treatmentName is required`);
  assert(isNonEmptyString(asset.marketSummary), `${filePath}: marketSummary is required`);
  assert(isNonEmptyString(asset.listPrice), `${filePath}: listPrice is required`);
  assert(isNonEmptyString(asset.cashPayRange), `${filePath}: cashPayRange is required`);
  assert(isNonEmptyString(asset.insuranceSummary), `${filePath}: insuranceSummary is required`);
  assert(isNonEmptyString(asset.couponSummary), `${filePath}: couponSummary is required`);
  assert(isNonEmptyString(asset.priorAuthSummary), `${filePath}: priorAuthSummary is required`);
}

function validateAppAsset(asset, filePath) {
  validateMeta(asset.meta, filePath);
  validateSeo(asset.seo, filePath, "/app/");
  validateTrust(asset.trust, asset.sources, filePath);
  validateFaqs(asset.faqs, filePath);
  validateCta(asset.cta, filePath);
  validateSourceList(asset.sources, filePath);

  assert(asset.meta.contentType === "app-landing", `${filePath}: contentType must be 'app-landing'`);
  assert(isNonEmptyString(asset.appUseCaseSlug), `${filePath}: appUseCaseSlug is required`);
  assert(isNonEmptyString(asset.title), `${filePath}: title is required`);
  assert(isNonEmptyString(asset.summary), `${filePath}: summary is required`);
  assert(isStringArray(asset.supportedTreatments), `${filePath}: supportedTreatments must be a non-empty string array`);
  assert(isStringArray(asset.supportedFeatures), `${filePath}: supportedFeatures must be a non-empty string array`);
  assert(isNonEmptyString(asset.privacySummary), `${filePath}: privacySummary is required`);
  assert(isNonEmptyString(asset.availabilitySummary), `${filePath}: availabilitySummary is required`);
}

function main() {
  const files = walkJsonFiles(GENERATED_ROOT);
  let treatmentCount = 0;
  let costCount = 0;
  let appCount = 0;

  assert(files.length > 0, "No generated JSON assets found.");

  for (const filePath of files) {
    const relativePath = relative(process.cwd(), filePath);
    const asset = JSON.parse(readFileSync(filePath, "utf8"));

    if (asset?.meta?.contentType === "treatment-hub") {
      validateTreatmentHubAsset(asset, relativePath);
      treatmentCount += 1;
      continue;
    }

    if (asset?.meta?.contentType === "cost") {
      validateCostAsset(asset, relativePath);
      costCount += 1;
      continue;
    }

    if (asset?.meta?.contentType === "app-landing") {
      validateAppAsset(asset, relativePath);
      appCount += 1;
      continue;
    }

    throw new Error(`${relativePath}: unsupported or missing meta.contentType`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        filesValidated: files.length,
        treatmentAssets: treatmentCount,
        costAssets: costCount,
        appAssets: appCount,
      },
      null,
      2
    )
  );
}

main();
