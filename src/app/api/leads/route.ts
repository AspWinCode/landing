import { NextRequest, NextResponse } from "next/server";

export interface LeadPayload {
  name: string;
  contact: string;       // phone or email
  track?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  // honeypot — should be empty
  _hp?: string;
}

function validateLead(data: LeadPayload): string | null {
  if (!data.name || data.name.trim().length < 2) return "Укажите имя";
  if (!data.contact || data.contact.trim().length < 5) return "Укажите телефон или e-mail";
  return null;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  // Honeypot check — bot filled the hidden field
  if (body._hp) {
    return NextResponse.json({ ok: true }); // silent success for bots
  }

  const error = validateLead(body);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  const lead = {
    name: body.name.trim(),
    contact: body.contact.trim(),
    track: body.track || null,
    message: body.message?.trim() || null,
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    created_at: new Date().toISOString(),
  };

  // TODO: forward to FastAPI backend → LMS
  // await fetch(`${process.env.API_URL}/leads`, { method: 'POST', body: JSON.stringify(lead), headers: { 'Content-Type': 'application/json' } });

  console.log("[LEAD]", lead);

  return NextResponse.json({ ok: true });
}
