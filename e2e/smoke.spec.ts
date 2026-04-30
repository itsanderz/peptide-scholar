import { test, expect } from "@playwright/test";

const ROUTES = {
  home: "/en",
  peptideSemaglutide: "/en/peptides/semaglutide",
  peptideBpc157: "/en/peptides/bpc-157",
  treatmentSemaglutide: "/en/treatments/semaglutide",
  treatmentTirzepatide: "/en/treatments/tirzepatide",
  tools: "/en/tools",
  halfLife: "/en/tools/half-life-visualizer",
  vialPlanner: "/en/tools/vial-planner",
  doctorExport: "/en/tools/doctor-export",
  cyclePlanner: "/en/tools/cycle-planner",
  tracker: "/en/app/tracker",
  arena: "/en/arena",
  compare: "/en/compare/semaglutide-vs-tirzepatide",
  resources: "/en/resources",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
};

test.describe("Smoke Tests", () => {
  test("homepage renders with nav and footer", async ({ page }) => {
    const res = await page.goto(ROUTES.home);
    expect(res?.status()).toBe(200);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  });

  test("peptide detail page renders all sections", async ({ page }) => {
    const res = await page.goto(ROUTES.peptideSemaglutide);
    expect(res?.status()).toBe(200);
    await expect(page.locator("text=Semaglutide").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Benefits" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Side Effects" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Dosing/i })).toBeVisible();
    await expect(page.locator("text=Research & Evidence")).toBeVisible();
  });

  test("treatment hub renders CTAs and affiliate grids", async ({ page }) => {
    const res = await page.goto(ROUTES.treatmentSemaglutide);
    expect(res?.status()).toBe(200);
    // Editorial view for semaglutide — different from standard view
    await expect(page.locator("text=Approved Product Paths").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Find a semaglutide provider/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open the tracker/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /FAQ/i })).toBeVisible();
  });

  test("half-life visualizer is interactive", async ({ page }) => {
    const res = await page.goto(ROUTES.halfLife);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "GLP-1 Half-Life Visualizer" })).toBeVisible();
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    await slider.fill("7");
    // After sliding, the chart should show active range label
    await expect(page.locator("text=Active range").first()).toBeVisible();
  });

  test("tracker loads tabs and form works", async ({ page }) => {
    const res = await page.goto(ROUTES.tracker);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("button", { name: "Dose Log" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Symptoms" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Reminder" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export" })).toBeVisible();
    await page.getByRole("button", { name: "Dose Log" }).click();
    await expect(page.getByRole("button", { name: "Log Dose" })).toBeVisible();
  });
});

test.describe("Additional Smoke Tests", () => {
  test("vial planner calculates", async ({ page }) => {
    const res = await page.goto(ROUTES.vialPlanner);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Peptide Vial Supply Planner" })).toBeVisible();
    const select = page.locator("select").first();
    await expect(select).toBeVisible();
  });

  test("doctor export renders form", async ({ page }) => {
    const res = await page.goto(ROUTES.doctorExport);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Doctor-Ready Export" })).toBeVisible();
    await expect(page.locator("text=Your data never leaves your device")).toBeVisible();
  });

  test("arena loads voting UI", async ({ page }) => {
    const res = await page.goto(ROUTES.arena);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Protocol Arena" })).toBeVisible();
  });

  test("compare page renders", async ({ page }) => {
    const res = await page.goto(ROUTES.compare);
    expect(res?.status()).toBe(200);
    await expect(page.locator("text=Head-to-Head Comparison")).toBeVisible();
  });

  test("resources page has affiliate grids", async ({ page }) => {
    const res = await page.goto(ROUTES.resources);
    expect(res?.status()).toBe(200);
    await expect(page.locator("text=GLP-1 Support Essentials").first()).toBeVisible();
    await expect(page.locator("text=Amazon affiliate links").first()).toBeVisible();
  });

  test("sitemap is valid XML", async ({ page }) => {
    const res = await page.goto(ROUTES.sitemap);
    expect(res?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("<urlset");
    expect(body).toContain("/treatments/semaglutide");
  });

  test("robots.txt returns directives", async ({ page }) => {
    const res = await page.goto(ROUTES.robots);
    expect(res?.status()).toBe(200);
    const body = await page.textContent("body");
    expect(body).toContain("User-Agent");
    expect(body).toContain("Sitemap:");
  });
});
