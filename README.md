# Vibecoder Idea Tester

A small web app where vibecoders test their app ideas with MiroFish before building them.

## What it does

- You write an app idea (problem, audience, features, pricing).
- MiroFish simulates "how people would react".
- You see: pros, cons, and pricing feedback.

## Tech stack (MVP)

- Frontend: Next.js (`web/`)
- Backend: Node.js + Express (`backend/`)
- AI: MiroFish

## Folder structure

```
vibecoder-idea-tester/
├─ README.md
├─ docs/              ← design docs, roadmap, API specs
├─ backend/           ← Node.js + Express + MiroRunner
└─ web/               ← Next.js + Tailwind (coming soon)
```

## Roadmap

1. ✅ Local MiroFish + stub backend API
2. ⬜ Next.js frontend form + results page
3. ⬜ Real MiroFish integration
4. ⬜ DB + user accounts + rate limits
5. ⬜ Stripe monetization
6. ⬜ Deployment

See `docs/roadmap.md` for the full detailed plan.
