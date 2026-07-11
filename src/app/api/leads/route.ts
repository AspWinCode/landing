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

const PORTAL_API_URL = process.env.PORTAL_API_URL ?? "https://tirskix.space";

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  // Honeypot — silent success for bots
  if (body._hp) {
    return NextResponse.json({ ok: true });
  }

  const error = validateLead(body);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  try {
    const resp = await fetch(`${PORTAL_API_URL}/api/v1/public/leads/site-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name.trim(),
        contact: body.contact.trim(),
        track: body.track || null,
        message: body.message?.trim() || null,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("[LEAD] portal error", resp.status, detail);
      return NextResponse.json({ error: "Ошибка сервера. Попробуйте позже." }, { status: 502 });
    }
  } catch (err) {
    console.error("[LEAD] fetch failed", err);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте позже." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
