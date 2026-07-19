import { NextRequest, NextResponse } from "next/server";
import { company } from "@/lib/company";

export const runtime = "nodejs";

interface ContactLead {
  name: string;
  email: string;
  phone: string;
  company?: string;
  reference?: string;
  type: string;
  urgency?: string;
  message: string;
  context?: string;
  timestamp?: string;
  website?: string; // honeypot
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateHits = new Map<string, { count: number; resetAt: number }>();

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowRequest(ip: string) {
  const now = Date.now();
  const row = rateHits.get(ip);
  if (!row || now > row.resetAt) {
    rateHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (row.count >= RATE_MAX) return false;
  row.count += 1;
  return true;
}

function leadMessage(lead: ContactLead) {
  return [
    `Type: ${lead.type}`,
    lead.urgency ? `Urgence: ${lead.urgency}` : null,
    lead.phone ? `Téléphone: ${lead.phone}` : null,
    lead.company ? `Entreprise: ${lead.company}` : null,
    lead.reference ? `Référence: ${lead.reference}` : null,
    lead.context ? `Contexte: ${lead.context}` : null,
    "",
    lead.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (!allowRequest(ip)) {
    return NextResponse.json(
      { success: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const lead: ContactLead = {
      name: asText(body.name),
      email: asText(body.email).toLowerCase(),
      phone: asText(body.phone),
      company: asText(body.company),
      reference: asText(body.reference),
      type: asText(body.type),
      urgency: asText(body.urgency),
      message: asText(body.message),
      context: asText(body.context),
      timestamp: asText(body.timestamp),
      website: asText(body.website),
    };

    // Honeypot: silently accept bots
    if (lead.website) {
      return NextResponse.json({ success: true });
    }

    if (!lead.name || !lead.email || !lead.phone || !lead.type || !lead.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!isEmail(lead.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (lead.message.length < 10 || lead.message.length > 5000 || lead.name.length > 120) {
      return NextResponse.json(
        { success: false, error: "Invalid field length" },
        { status: 400 },
      );
    }

    const id = `lead-${Date.now()}`;
    const subject = `${company.name} — ${lead.type} de ${lead.name}`;
    const message = leadMessage(lead);
    const formspreeId =
      process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (formspreeId) {
      const form = new FormData();
      form.set("name", lead.name);
      form.set("email", lead.email);
      form.set("phone", lead.phone);
      form.set("message", message);
      form.set("_subject", subject);

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        return NextResponse.json(
          { success: false, error: "upstream" },
          { status: 502 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your request has been recorded successfully",
        id,
        provider: "formspree",
      });
    }

    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(company.email)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message,
          _subject: subject,
          _replyto: lead.email,
          _template: "table",
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "upstream" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been recorded successfully",
      id,
      provider: "formsubmit",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your request" },
      { status: 500 },
    );
  }
}
