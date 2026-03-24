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
    <section className="mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl font-bold mb-4">{title ?? "Frequently Asked Questions"}</h2>
      <div className="space-y-2">
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50"
      >
        <span>{question}</span>
        <span className="text-gray-400 ml-2">{open ? "\u2212" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
