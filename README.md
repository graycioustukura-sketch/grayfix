# Grayfix

**Escrow, without the trust fall.**

![Stellar](https://img.shields.io/badge/Network-Stellar-000000?style=for-the-badge&logo=stellar&logoColor=white)
![Soroban](https://img.shields.io/badge/Contracts-Soroban%20(Rust)-7C6FEF?style=for-the-badge)
![CI](https://img.shields.io/github/actions/workflow/status/graycioustukura-sketch/grayfix/ci.yml?branch=main&style=for-the-badge&label=CI)
![License](https://img.shields.io/badge/License-MIT-34D399?style=for-the-badge)

Grayfix is a decentralized escrow protocol for trading physical goods between
parties who've never met and don't fully trust each other. A Soroban smart
contract on Stellar holds the buyer's funds in a neutral vault, releases them
only when delivery is verified, and splits losses fairly when something goes
wrong in transit — so neither side has to "send first" and hope.

This monorepo holds the smart contracts, backend API, web frontend, and
mobile app that make up the product.

---

## Contents

- [Why Grayfix](#why-grayfix)
- [Features](#features)
- [How a trade works](#how-a-trade-works)
- [Tech stack](#tech-stack)
- [Repo layout](#repo-layout)
- [Getting started](#getting-started)
- [Run the end-to-end demo](#run-the-end-to-end-demo)
- [CI gates](#ci-gates)
- [Observability](#observability)
- [Architecture & decisions](#architecture--decisions)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Why Grayfix

Regional trade in physical goods has a structural trust problem: whoever
moves first — sending payment or shipping product — is exposed if the other
side doesn't follow through. Grayfix removes that exposure. Funds sit in a
programmable, neutral vault instead of either party's pocket, and the
contract only pays out once delivery is confirmed or a dispute is resolved.

## Features

- **Smart escrow** — funds are held in cNGN/stablecoins on the Stellar
  network for the life of a trade, controlled entirely by contract logic.
- **Dynamic loss sharing** — buyer and seller agree on a risk-split ratio
  (e.g. 50/50, 70/30) that's locked into the trade up front and used
  automatically if goods are lost or damaged in transit.
- **Proof-of-delivery** — an optional video verification step between buyer
  and driver confirms the state of goods on arrival; evidence is stored on
  IPFS so it's available for dispute review later.
- **Volatility protection** — Stellar Path Payments let buyers pay in local
  currency (NGN) while the trade's value is locked in cNGN.
- **Automated settlement** — a flat 1% platform fee is deducted automatically
  when a trade completes, no manual invoicing required.

## How a trade works

1. **Initiate** — the seller lists goods; the buyer starts a trade, and
   funds are converted to cNGN via a Stellar Path Payment.
2. **Lock** — the contract locks the funds and stores the agreed
   `Loss_Ratio` for the trade.
3. **Dispatch** — the seller records the driver's name, phone number, and
   vehicle manifest.
4. **Verify** — on success, the buyer confirms delivery with a video and
   funds release to the seller. If something's wrong, the buyer submits
   evidence of loss or damage and a mediator reviews the dispute.
5. **Settle** — funds are distributed per the outcome: 100% to one party, or
   split according to the `Loss_Ratio`.

## Tech stack

| Layer | Choice |
|---|---|
| Smart contracts | [Soroban](https://soroban.stellar.org/) (Rust) |
| Blockchain | [Stellar Network](https://www.stellar.org/) |
| Frontend | [Next.js](https://nextjs.org/) (App Router) |
| Wallets | [Freighter](https://www.freighter.app/) / [Albedo](https://albedo.link/) |
| Backend | Node.js / TypeScript |
| Database | Supabase (off-chain metadata, driver logs, user profiles) |
| File storage | IPFS via Pinata (delivery evidence video) |
| Observability | OpenTelemetry distributed tracing with request correlation IDs |

## Repo layout

| Path | What it is |
|---|---|
| `contracts/` | Rust/Soroban smart contract (`grayfix_escrow`) |
| `backend/` | Node.js/TypeScript API — Supabase, Pinata, chain integration |
| `frontend/` | Next.js app — trade UI, wallet connection, Supabase/Pinata client |
| `mobile/` | React Native (Expo) app — mobile wallet and trade flows |
| `docs/` | Architecture, ADRs, runbooks, and operational guides |
| `infra/` | Terraform and Kubernetes manifests |

## Getting started

Grayfix uses **pnpm** as its package manager:

```bash
npm install -g pnpm
```

**Frontend**

```bash
cd frontend
cp .env.example .env.local
pnpm install
pnpm run dev
```

**Backend**

```bash
cd backend
cp .env.example .env
cp .env.tracing.example .env.tracing   # distributed tracing config
pnpm install
pnpm run dev
```

**Mobile**

```bash
cd mobile
cp .env.example .env.local
pnpm install
pnpm start
```

**Contracts**

```bash
cd contracts/grayfix_escrow
cargo build
```

**Backend API docs**

- Source of truth: [`backend/src/docs/openapi.yaml`](./backend/src/docs/openapi.yaml)
- Local Swagger UI: `http://localhost:4000/api/docs`
- JSON export: `http://localhost:4000/api/docs/openapi.json` (written from the YAML spec in non-production runs)
- [API contract examples](./backend/docs/api-contract-examples.md) — JS/TypeScript snippets for auth and every trade operation
- [SDK usage guide](./backend/docs/sdk-usage.md) — typed client for frontend, mobile, and Node

## Run the end-to-end demo

See the full trade lifecycle — **create → deposit → confirm delivery →
release funds** — running against the real API, real business logic, and a
real Postgres database. No cloud accounts, deployed contract, or funded
wallet required.

`DEMO_MODE=true` stubs only the Soroban RPC calls (which need a deployed
escrow contract and a funded testnet wallet). Everything else — auth,
validation, the trade state machine, Postgres — runs for real. Chain
confirmation is simulated via the app's own admin trade-status endpoint,
standing in for what the on-chain event indexer does once a wallet signs and
submits a transaction.

1. **Start local Postgres + Redis:**
   ```bash
   docker compose --profile dev up -d
   ```
2. **Configure and start the backend:**
   ```bash
   cd backend
   cp .env.example .env
   # The smoke test signs in as a demo "admin/mediator" using a well-known,
   # funds-less local-only keypair — allowlist its public key:
   echo 'ADMIN_STELLAR_PUBKEYS=GBGZ4I3UFZRYBWLLGVDHG3AEII53ZZYIVN6TXY4IQHEIUGWBVEADQS5L' >> .env
   pnpm install
   npx prisma migrate deploy
   DEMO_MODE=true pnpm run dev
   ```
3. **Run the smoke test in another terminal:**
   ```bash
   cd backend
   pnpm demo:smoke
   ```
   Drives a fresh trade through every stage using real challenge/signature
   auth (freshly generated Stellar keypairs) and prints a pass/fail
   checklist — 12/12 on a clean setup.
4. **Optional — see it in the browser** (with the backend running):
   ```bash
   cd frontend
   cp .env.example .env.local
   echo 'NEXT_PUBLIC_DEMO_MODE=true' >> .env.local
   pnpm install
   pnpm run dev
   ```
   Open `http://localhost:3000/trades/create` with a
   [Freighter](https://www.freighter.app/) wallet installed — any funded or
   unfunded testnet keypair works, since no real signing is submitted.
   `NEXT_PUBLIC_DEMO_MODE=true` skips the one step that can't work without a
   deployed contract (submitting the signed transaction to live Stellar RPC)
   and treats a successful sign as the terminal step, matching how the
   backend simulates chain confirmation. The full lifecycle is clickable
   end-to-end this way; the smoke test remains the automated, no-browser
   proof.

**Demonstrates:** the real trade lifecycle state machine, auth, and Postgres
persistence, end-to-end. **Stubbed:** Soroban contract calls, Freighter
signing, and on-chain event indexing — see the [Roadmap](#roadmap) for where
those stand.

## CI gates

Grayfix enforces stack-level required checks on every pull request via
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml), each running only
when its stack has changed files:

| Gate | Runs |
|---|---|
| Frontend | `pnpm install --frozen-lockfile`, `lint`, `build`, `test` in `frontend/` |
| Backend | `pnpm install --frozen-lockfile`, `build`, `test` in `backend/` |
| Mobile | `pnpm install --frozen-lockfile`, `type-check`, `lint` in `mobile/` |
| Contracts | `cargo test` in `contracts/grayfix_escrow/` |

**Branch protection (`main`)** should require: `Frontend Required Gate`,
`Backend Required Gate`, `Contracts Required Gate`.

## Observability

Grayfix ships with OpenTelemetry distributed tracing for end-to-end request
visibility and faster incident triage:

- **Correlation IDs** spanning frontend → backend requests
- **Full request lifecycle** tracking
- **Automatic tracing** for external service calls (IPFS, Stellar)
- **Jaeger, Zipkin, and Prometheus** integration

Quick start: configure `backend/.env.tracing.example`, then run
`docker run -p 16686:16686 jaegertracing/all-in-one` and view traces at
`http://localhost:16686` (metrics at `http://localhost:9464/metrics`).
Full setup: [DISTRIBUTED_TRACING_GUIDE.md](./backend/DISTRIBUTED_TRACING_GUIDE.md).

- [Prometheus Metrics](./docs/PROMETHEUS_METRICS.md) — trade throughput, disputes, and latency at `/metrics`
- [Visual Regression Testing](./docs/VISUAL_REGRESSION_TESTING.md) — Playwright UI checks across viewports

## Architecture & decisions

- [System Architecture](./docs/architecture.md)
- [Sequence Diagrams](./docs/sequence-diagrams.md)
- [Audit Logging](./docs/audit-logging.md)
- [Mediator Dashboard Spec](./docs/mediator-dashboard-spec.md)

**ADRs** ([`docs/adr/`](./docs/adr)):

- [ADR-001: Stellar Path Payment Architecture](./docs/adr/ADR-001-stellar-path-payment-architecture.md)
- [ADR-002: Escrow Loss-Sharing Model](./docs/adr/ADR-002-escrow-loss-sharing-model.md)
- [ADR-003: Off-chain vs. On-chain Data Partitioning](./docs/adr/ADR-003-offchain-vs-onchain-data-partitioning.md)
- [ADR-004: Idempotency and Retry Strategy](./docs/adr/ADR-004-idempotency-and-retry-strategy.md)
- [ADR-005: Frontend State Management](./docs/adr/ADR-005-frontend-state-management.md)

## Roadmap

- [x] **The Vault** — core Soroban contract logic (`deposit`, `release`, `refund`); basic Next.js trade-creation UI
- [x] **The Agreement Engine** — `Loss_Ratio` built into the contract; mediator dashboard for dispute resolution
- [x] **Evidence & Logistics** — IPFS video evidence uploads; driver manifest logging and tracking
- [x] **Trust Score** — on-chain reputation system
- [ ] **Mainnet & Scale** — public pilot program with regional trading cooperatives

## Contributing

Grayfix is open source and welcomes developers, designers, and domain
experts. New here? Start with the
[Contributor Onboarding Guide](./docs/CONTRIBUTOR_ONBOARDING.md). Full
standards live in [CONTRIBUTING.md](./CONTRIBUTING.md); everyone is expected
to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

```bash
git checkout -b feature/your-feature
# make your changes
git commit -m "Add your feature"
git push origin feature/your-feature
# open a pull request
```

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.
