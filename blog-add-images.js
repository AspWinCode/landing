#!/usr/bin/env node
// Добавляет cover_image постам у которых его нет (через Pollinations.ai)
// Env: PORTAL_URL, PORTAL_EMAIL, PORTAL_PASSWORD

const PORTAL_URL = process.env.PORTAL_URL || 'https://tirskix.space';
const PORTAL_EMAIL = process.env.PORTAL_EMAIL;
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD;

function getImageUrl(title, id) {
  const prompt = encodeURIComponent(
    `professional photography, ${title}, children learning programming, modern bright classroom, natural lighting, sharp focus, photorealistic`
  );
  return `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&model=flux-realism&seed=${id * 17}&enhance=true&nologo=true`;
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

  const noCover = items.filter((p) => !p.cover_image);
  console.log(`🖼️  Постов без картинки: ${noCover.length}`);

  for (const post of noCover) {
    const imageUrl = getImageUrl(post.title, post.id);
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
