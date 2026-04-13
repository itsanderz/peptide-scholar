import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, signupLocation, marketCode, offerSlug } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // If Resend API key is configured, send via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PeptideScholar <noreply@peptidescholar.com>",
          to: [email],
          subject: "Welcome to PeptideScholar",
          html: `<h2>Welcome to PeptideScholar</h2><p>Thanks for subscribing! You'll receive weekly summaries of new peptide studies, regulatory changes, and evidence updates.</p><p>— The PeptideScholar Team</p>`,
        }),
      });
    }

    // Log subscriber (works without any external service)
    console.log(
      `[SUBSCRIBE] ${email} market=${marketCode ?? "unknown"} location=${signupLocation ?? "unknown"} offer=${offerSlug ?? "unknown"} at ${new Date().toISOString()}`
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
