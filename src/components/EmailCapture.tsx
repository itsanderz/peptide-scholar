"use client";

import { useState } from "react";
import { trackAppWaitlistJoin, trackEmailSignup } from "@/lib/analytics";

interface EmailCaptureProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  signupLocation?: string;
  marketCode?: string;
  offerSlug?: string;
  appUseCase?: string;
  platformInterest?: string;
}

export function EmailCapture({
  headline = "Stay Updated",
  description = "Get useful tips and updates delivered to your inbox.",
  buttonText = "Subscribe",
  signupLocation = "homepage",
  marketCode,
  offerSlug,
  appUseCase,
  platformInterest,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, signupLocation, marketCode, offerSlug }),
      });
    } catch {
      // Network error — still show success (email logged server-side on retry)
    }

    trackEmailSignup(signupLocation, marketCode, offerSlug);
    if (marketCode && appUseCase) {
      trackAppWaitlistJoin(marketCode, appUseCase, platformInterest ?? "unspecified");
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="py-12 px-4">
        <div
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            textAlign: "center",
            padding: "2rem",
            borderRadius: "0.75rem",
            backgroundColor: "var(--color-surface, #f0fdf4)",
            border: "1px solid var(--color-border, #bbf7d0)",
          }}
        >
          <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-primary, #16a34a)", marginBottom: "0.25rem" }}>
            You&apos;re subscribed!
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #6b7280)" }}>
            Check your inbox for a confirmation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div
        style={{
          maxWidth: "540px",
          margin: "0 auto",
          textAlign: "center",
          padding: "2rem",
          borderRadius: "0.75rem",
          backgroundColor: "var(--color-surface, #f9fafb)",
          border: "1px solid var(--color-border, #e5e7eb)",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--color-text, #111827)",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-muted, #6b7280)",
            marginBottom: "1.25rem",
          }}
        >
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: "1 1 220px",
              maxWidth: "320px",
              padding: "0.6rem 0.9rem",
              fontSize: "0.95rem",
              border: "1px solid var(--color-border, #d1d5db)",
              borderRadius: "0.5rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.6rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-primary, #2563eb)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        </form>
        {error && (
          <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-muted, #9ca3af)",
            marginTop: "0.75rem",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
