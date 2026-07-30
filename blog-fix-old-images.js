#!/usr/bin/env node
// Заменяет старые реалистичные картинки (flux-realism) на flat design
// Env: PORTAL_URL, PORTAL_EMAIL, PORTAL_PASSWORD

const PORTAL_URL = process.env.PORTAL_URL || 'https://tirskix.space';
const PORTAL_EMAIL = process.env.PORTAL_EMAIL;
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD;

function getImageUrl(imagePrompt, seed) {
  const prompt = encodeURIComponent(
    `flat design vector illustration, ${imagePrompt}, kids coding on laptops, bright colorful modern style, clean minimal, no text, professional educational poster`
  );
  const negative = encodeURIComponent(
    `photo, realistic, hands, fingers, face, people, deformed, ugly, blurry, watermark`
  );
  return `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&model=flux&seed=${seed}&negative=${negative}&nologo=true`;
}

async function login() {
  const form = new URLSearchParams();
  form.append('username', PORTAL_EMAIL);
  form.append('password', PORTAL_PASSWORD);
  const res = await fetch(`${PORTAL_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return (await res.json()).access_token;
}

async function main() {
  console.log('🔑 Авторизация...');
  const token = await login();

  console.log('📋 Получаем посты...');
  const res = await fetch(`${PORTAL_URL}/api/v1/blog/posts?limit=200`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { items } = await res.json();

  // Посты со старым стилем: flux-realism или enhance=true в URL
  const oldStyle = items.filter((p) =>
    p.cover_image && (
      p.cover_image.includes('flux-realism') ||
      p.cover_image.includes('enhance=true') ||
      p.cover_image.includes('photorealistic')
    )
  );

  console.log(`🖼️  Постов со старым стилем картинок: ${oldStyle.length}`);
  if (oldStyle.length === 0) {
    console.log('✅ Все картинки уже в новом стиле!');
    return;
  }

  for (const post of oldStyle) {
    const imageUrl = getImageUrl(post.title, post.id * 31 + 7);
    const patchRes = await fetch(`${PORTAL_URL}/api/v1/blog/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cover_image: imageUrl }),
    });
    if (patchRes.ok) {
      console.log(`✅ [${post.id}] ${post.title}`);
    } else {
      console.log(`❌ [${post.id}] ${post.title} — ${patchRes.status}`);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log('🎉 Готово!');
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
