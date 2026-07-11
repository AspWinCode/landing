import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const SLUG_TO_PATH: Record<string, string> = {
  home: "/",
  "legal-oferta": "/legal/oferta",
  "legal-privacy": "/legal/privacy",
  "legal-terms": "/legal/terms",
};

function slugToPath(slug: string): string {
  return SLUG_TO_PATH[slug] ?? `/${slug}`;
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    // no body — revalidate all
  }

  if (!slug || slug === "*") {
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, revalidated: "all" });
  }

  const path = slugToPath(slug);
  revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: path });
}
