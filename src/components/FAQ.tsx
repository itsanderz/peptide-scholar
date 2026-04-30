"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="section-title">{title ?? "Frequently Asked Questions"}</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <FAQAccordion key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}

function FAQAccordion({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="faq-button"
      >
        <span>{question}</span>
        <span>{open ? "-" : "+"}</span>
      </button>
      {open && (
        <div className="faq-answer">
          {answer}
        </div>
      )}
    </div>
  );
}
