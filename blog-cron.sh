#!/bin/sh
# Запускается через cron на VPS (устанавливается автоматически шагом deploy.yml).
# Ключи и логин CMS читаются из blog.env рядом с этим скриптом — заводится один раз
# вручную на сервере, в git не попадает и в GitHub Secrets не хранится.
set -e
cd "$(dirname "$0")"

if [ ! -f blog.env ]; then
  echo "❌ Нет файла blog.env рядом со скриптом — создайте его один раз вручную (см. README/чат)." >&2
  exit 1
fi

exec docker run --rm --env-file blog.env \
  -v "$(pwd)/blog-auto-generate.js:/app/blog-auto-generate.js:ro" \
  -w /app node:20-alpine node blog-auto-generate.js
