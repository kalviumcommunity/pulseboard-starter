# PulseBoard

A small community posts board: users log in, post links, and upvote posts.
Built on **Express + Prisma (PostgreSQL) + Redis**. This is a lab starter — the plumbing
works; you complete five marked tasks.

## Prerequisites

- Node.js 18+
- A local **PostgreSQL** running
- A local **Redis** running

## Setup

```bash
npm install
cp .env.example .env          # fill in DATABASE_URL, REDIS_URL, SESSION_SECRET
npx prisma migrate dev        # create the tables
npm run seed                  # insert a few users and posts
npm run dev                   # start on http://localhost:3000
```

## Endpoints

| Method | Path | What it does |
|---|---|---|
| GET | `/health` | liveness check |
| POST | `/login` | log in by `{ "username": "alice" }` (Task 5) |
| GET | `/me` | current session user (Task 5) |
| POST | `/logout` | end the session (Task 5) |
| GET | `/posts` | newest-first feed (Task 3 caches this) |
| POST | `/posts` | create a post `{ title, url }` |
| POST | `/posts/:id/vote` | upvote a post (Task 1; rate-limited in Task 4) |

Seeded users: `alice`, `bob`.

## Your tasks

See the assignment sheet. In short:

1. **Vote endpoint** — `src/routes/posts.js` (`$transaction`, atomic `increment`, `P2002` → 409)
2. **Composite index + EXPLAIN ANALYZE** — `prisma/schema.prisma` + `ANSWERS.md`
3. **Cache-aside + stampede protection** — `src/cache/cached.js` + `src/routes/posts.js`
4. **Sliding-window rate limiter (MULTI/EXEC)** — `src/middleware/rateLimit.js` + `src/routes/posts.js`
5. **Sessions (connect-redis, sliding expiry)** — `src/app.js` + `src/routes/auth.js`

## Submit

Zip the project **without** `node_modules`, `.env`, and `.git`. Include your filled-in `ANSWERS.md`.
