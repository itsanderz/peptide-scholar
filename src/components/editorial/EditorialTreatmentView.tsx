import Link from "next/link";
import { BreadcrumbNav, FAQ, MedicalDisclaimer, SourceCitationList } from "@/components";
import type { TreatmentHubContent } from "@/types/generated-content";
import type { Market } from "@/types/market";
import { EDITORIAL, editorialFont } from "./tokens";
import { EditorialEyebrow } from "./EditorialEyebrow";

interface Props {
  hub: TreatmentHubContent;
  market: Market;
}

export function EditorialTreatmentView({ hub, market }: Props) {
  return (
    <div style={{ backgroundColor: EDITORIAL.paper, color: EDITORIAL.ink }}>
      {/* Top frame */}
      <div
        className="border-b px-4 pt-6 pb-4"
        style={{ borderColor: EDITORIAL.ruleSoft }}
      >
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Treatments", href: "/treatments" },
              { label: hub.treatmentName, href: hub.seo.canonicalPath },
            ]}
          />
        </div>
      </div>

      {/* Hero — framed overlay, editorial hierarchy */}
      <header className="px-4">
        <div className="max-w-6xl mx-auto pt-16 md:pt-24 pb-14 md:pb-20">
          <div
            className="grid md:grid-cols-12 gap-10 md:gap-14 items-start"
            style={{ fontFamily: EDITORIAL.serif }}
          >
            <div className="md:col-span-7">
              <EditorialEyebrow number="01">
                Treatment · {hub.fdaStatus === "approved" ? "FDA approved" : hub.fdaStatus}
              </EditorialEyebrow>
              <h1
                className="text-[44px] leading-[1.02] md:text-[78px] md:leading-[0.98] font-bold tracking-tight"
                style={{ ...editorialFont.display, color: EDITORIAL.ink }}
              >
                {hub.treatmentName}
              </h1>
              <p
                className="mt-8 max-w-[56ch] text-[19px] md:text-[21px] leading-[1.55]"
                style={{ color: EDITORIAL.inkMuted }}
              >
                {hub.marketSummary}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href={hub.cta.primaryHref || "/providers"}
                  className="inline-flex items-center gap-3 px-6 py-3 text-[11px] sm:text-sm font-semibold leading-none"
                  style={{
                    ...editorialFont.meta,
                    backgroundColor: EDITORIAL.ink,
                    color: EDITORIAL.paper,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    minHeight: 48,
                    border: `1px solid ${EDITORIAL.ink}`,
                  }}
                >
                  {hub.cta.primaryLabel} &rarr;
                </Link>
                <Link
                  href="/app/tracker"
                  className="text-sm underline underline-offset-[6px] decoration-1"
                  style={{ ...editorialFont.meta, color: EDITORIAL.sageDeep }}
                >
                  Or try the free tracker
                </Link>
              </div>
            </div>

            {/* Side panel — editorial stats frame */}
            <aside className="md:col-span-5">
              <div
                className="relative"
                style={{
                  border: `1px solid ${EDITORIAL.ink}`,
                  backgroundColor: EDITORIAL.paperDeep,
                  padding: "28px 28px 24px",
                }}
              >
                <div
                  className="absolute -top-3 left-6 px-2 text-[10px]"
                  style={{
                    ...editorialFont.eyebrow,
                    backgroundColor: EDITORIAL.paper,
                    color: EDITORIAL.ink,
                  }}
                >
                  At a glance
                </div>
                <dl className="space-y-5">
                  <StatRow label="Evidence" value={hub.evidenceLevel} />
                  <StatRow label="Routes" value={hub.routes.join(" · ")} />
                  <StatRow label="Approved products" value={String(hub.approvedProducts.length)} />
                  <StatRow
                    label="Market"
                    value={market.code === "us" ? market.name : `${market.name} (staged)`}
                  />
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* Horizontal rule */}
      <div className="px-4">
        <div
          className="max-w-6xl mx-auto h-px"
          style={{ backgroundColor: EDITORIAL.rule }}
        />
      </div>

      {/* Market notice (non-US) */}
      {market.code !== "us" && (
        <section className="px-4">
          <div
            className="max-w-6xl mx-auto mt-10 p-6"
            style={{
              border: `1px dashed ${EDITORIAL.warn}`,
              backgroundColor: EDITORIAL.warnSurface,
              color: EDITORIAL.ink,
            }}
          >
            <EditorialEyebrow color={EDITORIAL.warn}>Market note</EditorialEyebrow>
            <p style={{ ...editorialFont.body, maxWidth: "72ch" }}>
              {market.name} is selected. This hub currently reflects US approval logic, approved
              product landscape, and US-first cost and provider resources.
            </p>
          </div>
        </section>
      )}

      {/* Section 02 — Overview (editorial prose) */}
      <Section number="02" title="Why this treatment matters">
        <p
          className="text-[20px] md:text-[22px] leading-[1.6] max-w-[64ch]"
          style={{ ...editorialFont.body, color: EDITORIAL.ink }}
        >
          {hub.overview}
        </p>
      </Section>

      <Rule />

      {/* Section 03 — Approved products as editorial list */}
      <Section number="03" title="Approved product paths">
        <ol className="space-y-10">
          {hub.approvedProducts.map((product, idx) => (
            <li key={product.slug} className="grid md:grid-cols-12 gap-6 md:gap-10">
              <div
                className="md:col-span-2 text-[56px] leading-none tabular-nums"
                style={{ ...editorialFont.display, color: EDITORIAL.sage }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-10">
                <h3
                  className="text-[28px] md:text-[34px] leading-tight font-semibold mb-3"
                  style={{ ...editorialFont.display, color: EDITORIAL.ink }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[17px] leading-[1.7] max-w-[60ch]"
                  style={{ ...editorialFont.body, color: EDITORIAL.inkMuted }}
                >
                  {product.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Rule />

      {/* Section 04 — Benefits / friction, two-column editorial */}
      <Section number="04" title="What to weigh">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <EditorialList label="Benefits" items={hub.benefits} accent={EDITORIAL.sage} />
          <EditorialList label="Side effects & friction" items={hub.sideEffects} accent={EDITORIAL.warn} />
        </div>
      </Section>

      <Rule />

      {/* Section 05 — Cost and provider framing */}
      <Section number="05" title="Cost and provider reality">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div
              className="text-[11px] mb-4"
              style={{ ...editorialFont.eyebrow, color: EDITORIAL.ink }}
            >
              Cost
            </div>
            <p
              className="text-[19px] leading-[1.65] max-w-[56ch]"
              style={{ ...editorialFont.body, color: EDITORIAL.ink }}
            >
              {hub.costSummary}
            </p>
            <Link
              href={`/costs/${hub.treatmentSlug}`}
              className="mt-6 inline-block text-sm underline underline-offset-[6px]"
              style={{ ...editorialFont.meta, color: EDITORIAL.sageDeep }}
            >
              Compare cost pathways &rarr;
            </Link>
          </div>
          <div>
            <div
              className="text-[11px] mb-4"
              style={{ ...editorialFont.eyebrow, color: EDITORIAL.ink }}
            >
              Provider
            </div>
            <p
              className="text-[19px] leading-[1.65] max-w-[56ch]"
              style={{ ...editorialFont.body, color: EDITORIAL.ink }}
            >
              {hub.providerSummary}
            </p>
            <Link
              href={`/providers/treatment/${hub.treatmentSlug}`}
              className="mt-6 inline-block text-sm underline underline-offset-[6px]"
              style={{ ...editorialFont.meta, color: EDITORIAL.sageDeep }}
            >
              See provider routes &rarr;
            </Link>
          </div>
        </div>
      </Section>

      <Rule />

      {/* Section 06 — Tracker / retention */}
      <Section number="06" title="Tracking the journey">
        <div
          className="p-8 md:p-10"
          style={{
            backgroundColor: EDITORIAL.paperDeep,
            border: `1px solid ${EDITORIAL.ink}`,
          }}
        >
          <p
            className="text-[19px] md:text-[21px] leading-[1.6] max-w-[64ch]"
            style={{ ...editorialFont.body, color: EDITORIAL.ink }}
          >
            {hub.appSummary}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link
              href="/app/tracker"
              className="inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold"
              style={{
                ...editorialFont.meta,
                backgroundColor: EDITORIAL.ink,
                color: EDITORIAL.paper,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Open the tracker &rarr;
            </Link>
            <Link
              href={`/app/${hub.treatmentSlug}-tracker`}
              className="text-sm underline underline-offset-[6px]"
              style={{ ...editorialFont.meta, color: EDITORIAL.sageDeep }}
            >
              See planned features for {hub.treatmentName}
            </Link>
          </div>
        </div>
      </Section>

      <Rule />

      {/* FAQ + sources in editorial style */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto py-16 md:py-20">
          <EditorialEyebrow number="07">Questions</EditorialEyebrow>
          <h2
            className="text-[32px] md:text-[44px] font-bold leading-tight mb-8"
            style={{ ...editorialFont.display, color: EDITORIAL.ink }}
          >
            {hub.treatmentName} FAQ
          </h2>
          <FAQ items={hub.faqs} title="" />
        </div>
      </section>

      <Rule />

      <section className="px-4">
        <div className="max-w-6xl mx-auto py-14 md:py-20">
          <EditorialEyebrow number="08">Sources & review</EditorialEyebrow>
          <p
            className="mb-6 text-[15px]"
            style={{ ...editorialFont.meta, color: EDITORIAL.inkMuted }}
          >
            Reviewed {hub.trust.reviewedAt}
            {hub.trust.reviewedBy ? ` by ${hub.trust.reviewedBy}` : ""} · cites{" "}
            {hub.trust.sourceCount} official source{hub.trust.sourceCount === 1 ? "" : "s"}
          </p>
          <SourceCitationList sources={hub.sources} />
          <div className="mt-10">
            <MedicalDisclaimer compact />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt
        className="text-[11px]"
        style={{ ...editorialFont.eyebrow, color: EDITORIAL.inkMuted }}
      >
        {label}
      </dt>
      <dd
        className="text-right text-[15px]"
        style={{ ...editorialFont.meta, color: EDITORIAL.ink }}
      >
        {value}
      </dd>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4">
      <div className="max-w-6xl mx-auto py-16 md:py-24">
        <EditorialEyebrow number={number}>{title.split(" ").slice(0, 2).join(" ")}</EditorialEyebrow>
        <h2
          className="text-[32px] md:text-[48px] font-bold leading-[1.05] mb-10 md:mb-12"
          style={{ ...editorialFont.display, color: EDITORIAL.ink }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function EditorialList({
  label,
  items,
  accent,
}: {
  label: string;
  items: string[];
  accent: string;
}) {
  return (
    <div>
      <div
        className="text-[11px] mb-5 pb-3"
        style={{
          ...editorialFont.eyebrow,
          color: accent,
          borderBottom: `1px solid ${EDITORIAL.ruleSoft}`,
        }}
      >
        {label}
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-[17px] leading-[1.7] pl-6 relative"
            style={{ ...editorialFont.body, color: EDITORIAL.ink }}
          >
            <span
              className="absolute left-0 top-[0.85em] h-px w-3"
              style={{ backgroundColor: accent }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rule() {
  return (
    <div className="px-4">
      <div
        className="max-w-6xl mx-auto h-px"
        style={{ backgroundColor: EDITORIAL.ruleSoft }}
      />
    </div>
  );
}
