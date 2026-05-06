# Roadmap

## Phase 1 – Stub backend (current)
- [x] Create repo and folder structure
- [x] Write stub `backend/server.js` that returns fake MiroFish results
- [ ] Clone and run MiroFish locally
- [ ] Document MiroFish input/output in `docs/mirofish-api.md`

## Phase 2 – Frontend
- [ ] Create Next.js app in `web/`
- [ ] Build a form: app name, problem, audience, features, pricing
- [ ] Call `POST /api/simulate-idea` and show results

## Phase 3 – Real MiroFish
- [ ] Connect backend to real MiroFish (NVIDIA API or Ollama)
- [ ] Parse real MiroFish JSON output
- [ ] Replace stub with real data

## Phase 4 – DB + users
- [ ] Add PostgreSQL or SQLite
- [ ] Users table + simulations table
- [ ] Rate limiting: 1 free sim / month

## Phase 5 – Monetization
- [ ] Stripe Checkout integration
- [ ] Plans: Free / Starter (6.99 USD) / Pro (19.99 USD)

## Phase 6 – Deploy
- [ ] Dockerize backend + MiroFish
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to VPS
