/**
 * Demo smoke test: drives the full Grayfix trade lifecycle
 * (create -> deposit -> confirm delivery -> release funds) through the
 * real API, real Postgres, and real challenge/signature auth crypto.
 *
 * Requires the backend running locally with DEMO_MODE=true (see README's
 * "How to run this demo" section) — that flag stubs only the Soroban RPC
 * calls, which need a deployed contract and a funded testnet wallet this
 * script doesn't have. Everything else (auth, validation, the Postgres
 * state machine) is exercised for real.
 *
 * Chain confirmation is simulated via the app's own admin trade-status
 * endpoint (POST /admin/trades/batch/status), standing in for what the
 * on-chain event indexer would normally do once a wallet signs and submits
 * each transaction.
 *
 * Usage: DEMO_MODE=true pnpm dev   (in one terminal)
 *        pnpm demo:smoke           (in another)
 */
import { Keypair } from "@stellar/stellar-sdk";

const BASE_URL = process.env.API_URL ?? "http://localhost:4000";

// Well-known local-only demo keypair. Its public key must be present in the
// backend's ADMIN_STELLAR_PUBKEYS env var. No funds, no network access —
// used only to sign in as the demo "admin/mediator" role. Never use in
// production.
const ADMIN_SECRET = "SA7XJJRUJBSBGK6TSFWMMOONPA6FF3NEVPGSEOZDOZ2UVPDV7HL6GPWI";

let passed = 0;
let failed = 0;

function ok(label: string, condition: boolean, detail?: unknown): void {
  if (condition) {
    passed += 1;
    console.log(`  ✓ ${label}`);
  } else {
    failed += 1;
    console.error(`  ✗ ${label}`);
    if (detail !== undefined) console.error("    ", detail);
  }
}

async function request(
  method: string,
  path: string,
  options: { token?: string; body?: unknown } = {},
): Promise<{ status: number; json: any }> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  return { status: res.status, json };
}

async function login(keypair: Keypair): Promise<string> {
  const walletAddress = keypair.publicKey();

  const challengeRes = await request("POST", "/auth/challenge", {
    body: { walletAddress },
  });
  if (challengeRes.status !== 200) {
    throw new Error(`challenge failed for ${walletAddress}: ${JSON.stringify(challengeRes.json)}`);
  }
  const { challenge } = challengeRes.json;

  const signature = keypair.sign(Buffer.from(challenge, "utf8"));
  const signedChallenge = signature.toString("base64url");

  const verifyRes = await request("POST", "/auth/verify", {
    body: { walletAddress, signedChallenge },
  });
  if (verifyRes.status !== 200) {
    throw new Error(`verify failed for ${walletAddress}: ${JSON.stringify(verifyRes.json)}`);
  }
  return verifyRes.json.token as string;
}

async function transitionStatus(adminToken: string, tradeId: string, status: string): Promise<void> {
  const res = await request("POST", "/admin/trades/batch/status", {
    token: adminToken,
    body: { updates: [{ tradeId, status }] },
  });
  ok(`admin transitions trade to ${status}`, res.status === 200 && res.json?.succeeded?.includes(tradeId), res.json);
}

async function main(): Promise<void> {
  console.log(`Grayfix demo smoke test against ${BASE_URL}\n`);

  const buyer = Keypair.random();
  const seller = Keypair.random();
  const admin = Keypair.fromSecret(ADMIN_SECRET);

  console.log("Signing in buyer, seller, and admin (real challenge/signature auth)...");
  const buyerToken = await login(buyer);
  const sellerToken = await login(seller);
  const adminToken = await login(admin);
  ok("buyer, seller, and admin authenticated", Boolean(buyerToken && sellerToken && adminToken));

  console.log("\nCreating trade...");
  const createRes = await request("POST", "/trades", {
    token: buyerToken,
    body: {
      sellerAddress: seller.publicKey(),
      amountUsdc: "100",
      buyerLossBps: 5000,
      sellerLossBps: 5000,
    },
  });
  ok("trade created (201)", createRes.status === 201, createRes.json);
  const tradeId = createRes.json?.tradeId as string;
  ok("tradeId returned", Boolean(tradeId));

  const afterCreate = await request("GET", `/trades/${tradeId}`, { token: buyerToken });
  ok("trade starts PENDING_SIGNATURE", afterCreate.json?.status === "PENDING_SIGNATURE", afterCreate.json);

  await transitionStatus(adminToken, tradeId, "CREATED");

  console.log("\nDepositing...");
  const depositRes = await request("POST", `/trades/${tradeId}/deposit`, { token: buyerToken });
  ok("deposit tx built (200)", depositRes.status === 200, depositRes.json);
  await transitionStatus(adminToken, tradeId, "FUNDED");

  console.log("\nConfirming delivery...");
  const confirmRes = await request("POST", `/trades/${tradeId}/confirm`, { token: buyerToken });
  ok("confirm tx built (200)", confirmRes.status === 200, confirmRes.json);
  await transitionStatus(adminToken, tradeId, "DELIVERED");

  console.log("\nReleasing funds...");
  const releaseRes = await request("POST", `/trades/${tradeId}/release`, { token: buyerToken });
  ok("release tx built (200)", releaseRes.status === 200, releaseRes.json);
  await transitionStatus(adminToken, tradeId, "COMPLETED");

  const final = await request("GET", `/trades/${tradeId}`, { token: buyerToken });
  ok("trade ends COMPLETED", final.json?.status === "COMPLETED", final.json);

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error("\nSmoke test crashed:", error);
  process.exit(1);
});
