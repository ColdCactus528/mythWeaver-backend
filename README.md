# MythWeaver 🧵✨

MythWeaver — это приложение для создания и управления персонажами DnD, с возможностью авторизации через Яндекс ID. Проект состоит из двух частей:

- **Фронтенд** — на React + TypeScript (размещён на [Vercel](https://vercel.com)). Вы можете изучить фронтенд репозиторий тут (https://github.com/ColdCactus528/mythWeaver) 
- **Бэкенд** — на Node.js (Express) + Prisma + PostgreSQL, с авторизацией через OAuth Яндекса

---

## 🚀 Возможности

- Создание и редактирование карточек персонажей
- Авторизация через Яндекс
- Хранение пользователей в базе данных PostgreSQL
- Сервер написан с использованием Express и Prisma ORM

---

## 🛠️ Установка локально

Перед этим вам надо будет создать .env файл 
- YANDEX_CLIENT_ID=your_yandex_client_id
- YANDEX_CLIENT_SECRET=your_yandex_client_secret
- JWT_SECRET=your_jwt_secret
- DATABASE_URL=postgresql://user:password@localhost:5434/dbname

1. **Клонировать репозиторий:**

```bash
git clone https://github.com/ColdCactus528/mythWeaver-server.git
cd mythWeaver-server
npm install
npx prisma migrate dev
npm run dev
