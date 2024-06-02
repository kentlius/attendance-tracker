# Attendance Tracker Backend

attendance tracker backend

## Getting Started

### Prerequisites

- Node.js v20
- pnpm

### Installing

install deps

```bash
pnpm i
```

copy `.env.example` to `.env`

```bash
cp .env.example .env
```

change DATABASE_URL value in `.env` to your database url, then run

```bash
npx prisma migrate dev
```

run server

```bash
pnpm dev
```

the server will run on <http://localhost:3001>

## Built With

- [Express.js](https://expressjs.com/) - The backend framework used
- [Prisma](https://www.prisma.io/) - Database ORM
- [Lucia](https://lucia-auth.com/) - Auth Library
