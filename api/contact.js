// Vercel serverless function: POST /api/contact
//
// Receives the contact form payload from the frontend, validates and
// sanitizes it, then sends an email via Resend (https://resend.com) to the
// address configured in CONTACT_EMAIL. No secrets are ever sent to the
// browser — RESEND_API_KEY only exists in this server-side function.
//
// Required environment variables (set in Vercel project settings, or a
// local .env file when running `vercel dev`):
//   CONTACT_EMAIL   - inbox that should receive submissions
//   RESEND_API_KEY  - secret API key from Resend
//   RESEND_FROM     - a verified "from" address/display name in Resend

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 4000;

// Very small in-memory rate limiter. Serverless functions are not
// guaranteed to reuse the same instance between requests, so treat this as
// a best-effort speed bump, not a hard guarantee — put a proper rate
// limiter (e.g. Upstash Redis, Vercel Edge Config) in front for production
// traffic at scale.
const submissions = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const entry = submissions.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  submissions.set(ip, entry);
  return entry.count > MAX_PER_WINDOW;
}

function sanitize(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again shortly." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const { name, email, phone, company, service, message, website } = body;

  // Honeypot: real users never fill this field. If it has a value, silently
  // pretend success so the bot doesn't learn its submission was rejected.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanPhone = sanitize(phone);
  const cleanCompany = sanitize(company);
  const cleanService = sanitize(service);
  const cleanMessage = sanitize(message);

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: "Please provide your name." });
  }
  if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  if (!cleanMessage || cleanMessage.length < 20) {
    return res.status(400).json({ error: "Please provide a bit more detail in your message." });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

  if (!RESEND_API_KEY || !RESEND_FROM || !CONTACT_EMAIL) {
    console.error("Contact API is missing required environment variables.");
    return res.status(500).json({ error: "Contact form is not configured yet." });
  }

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #111;">
      <h2 style="margin-bottom: 4px;">New website enquiry</h2>
      <p style="margin: 0 0 16px; color: #666;">Submitted via jayanthtechnologies.com contact form</p>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(cleanName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(cleanEmail)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(cleanPhone || "-")}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(cleanCompany || "-")}</td></tr>
        <tr><td><strong>Service</strong></td><td>${escapeHtml(cleanService || "-")}</td></tr>
      </table>
      <p style="margin-top: 16px;"><strong>Message</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [CONTACT_EMAIL],
        reply_to: cleanEmail,
        subject: `New enquiry from ${cleanName}${cleanCompany ? ` (${cleanCompany})` : ""}`,
        html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend API error:", errText);
      return res.status(502).json({ error: "Could not send your message right now." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}
