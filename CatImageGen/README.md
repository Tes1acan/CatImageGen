# 🐱 Cat Generator

Веб-приложение для генерации изображений котиков с использованием The Cat API.

## 🚀 Установка

1. Клонируйте репозиторий:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` и добавьте ваш API ключ:
```bash
cp .env.example .env
```

4. Получите бесплатный API ключ на [The Cat API](https://thecatapi.com/signup) и добавьте его в `.env`:
```
CAT_API_KEY=your_api_key_here
```

5. Запустите приложение:
```bash
npm run dev
```

## 🔐 Безопасность

⚠️ **ВАЖНО:** Никогда не публикуйте файл `.env` на GitHub!

- Файл `.env` уже добавлен в `.gitignore` для защиты ваших ключей
- Используйте `.env.example` чтобы показать другим разработчикам какие переменные нужны
- На Replit добавьте `CAT_API_KEY` в Secrets (замочек в боковой панели)

## 📝 Переменные окружения

- `CAT_API_KEY` - API ключ от The Cat API (обязательно)
- `DATABASE_URL` - URL базы данных PostgreSQL (опционально)

## 🛠️ Технологии

- React + TypeScript
- Express.js
- Tailwind CSS
- The Cat API
