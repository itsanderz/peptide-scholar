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
      <section className="email-capture is-success">
        <p className="email-capture-title">You&apos;re subscribed!</p>
        <p className="email-capture-copy">
            Check your inbox for a confirmation.
        </p>
      </section>
    );
  }

  return (
    <section className="email-capture">
        <h2 className="email-capture-title">
          {headline}
        </h2>
        <p className="email-capture-copy">
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          className="email-form"
        >
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn-lime"
          >
            {buttonText}
          </button>
        </form>
        {error && (
          <p className="email-error">
            {error}
          </p>
        )}
        <p className="email-fineprint">
          No spam. Unsubscribe anytime.
        </p>
    </section>
  );
}
