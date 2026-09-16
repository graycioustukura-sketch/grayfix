# Test Coverage Matrix

| Component/Service | Backend | Frontend | Contract | Integration | E2E |
|------------------|:-------:|:--------:|:--------:|:----------:|:----:|
| Trade Controller | ✓ | ✗ | ✗ | ✓ | ✗ |
| User Controller | ✗ | ✗ | ✗ | ✗ | ✗ |
| auditTrail.service.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| auth.service.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| contract.service.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| eventHandlers.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| eventListener.service.ts | ✓ | ✗ | ✗ | ✗ | ✗ |
| evidence.service.ts | ✓ | ✗ | ✗ | ✗ | ✗ |
| ipfs.service.ts | ✓ | ✗ | ✗ | ✗ | ✗ |
| manifest.service.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| pathPayment.service.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| stellar.service.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| trade.service.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| user.service.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| wallet.service.ts | ✓ | ✗ | ✗ | ✗ | ✗ |
| auditTrail.routes.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| auth.routes.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| evidence.routes.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| manifest.routes.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| trade.routes.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| user.routes.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| wallet.routes.ts | ✓ | ✗ | ✗ | ✗ | ✗ |
| trade.repository.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| auth.middleware.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| errorHandler.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| logger.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| user.validators.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| db.ts | ✓ | ✗ | ✗ | ✓ | ✗ |
| supabase.ts | ✗ | ✗ | ✗ | ✗ | ✗ |

<!-- Frontend components -->
| Divider.tsx | ✗ | ✓ | ✗ | ✗ | ✗ |
| TopNav.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| ContractInfo.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| DisputeVerificationModal.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| FinancialSummary.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| PartiesPanel.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| TradeAmountRow.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| TradeDetailPanel.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| TradeHeader.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| TradeTimeline.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| VaultSidebar.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| Badge.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| BentoCard.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| DriverManifestForm.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| FormField.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| Icon.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| LegalDisclaimerModal.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| LoadingState.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| RepScoreRing.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| Spinner.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| StepIndicator.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| SuccessState.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| VideoUploadCard.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| WalletAddressBadge.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| useFreighterIdentity.ts | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/trades/create/Step1Details.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/trades/create/Step2Negotiation.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/trades/create/Step3Review.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/trades/create/TradeContext.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| mediator/disputes/[id]/MediatorPanelClient.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| mediator/disputes/[id]/page.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/vault/page.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |
| app/vault/loading.tsx | ✗ | ✗ | ✗ | ✗ | ✗ |

| contracts/grayfix_escrow (lib.rs) | ✗ | ✗ | ✓ | ✓ | ✗ |

## Missing Test Coverage

Below are components/services with no tests detected (partial scan). Estimated LOC are coarse approximations.

| Component | Priority | Estimated LOC |
|----------|---------:|-------------:|
| User Controller | High | 120 |
| auth.service.ts | Critical | 250 |
| contract.service.ts | High | 200 |
| pathPayment.service.ts | Medium | 120 |
| stellar.service.ts | Medium | 150 |
| user.service.ts | High | 180 |
| trade.repository.ts | Medium | 100 |
| auth.routes.ts | High | 80 |
| evidence.routes.ts | Medium | 80 |
| user.routes.ts | High | 80 |
| supabase.ts | Medium | 90 |
| TopNav.tsx | Medium | 120 |
| ContractInfo.tsx | High | 180 |
| FinancialSummary.tsx | High | 160 |
| PartiesPanel.tsx | Medium | 140 |
| TradeDetailPanel.tsx | Medium | 200 |
| TradeHeader.tsx | Low | 80 |
| TradeTimeline.tsx | Low | 120 |
| VaultSidebar.tsx | Medium | 110 |
| UI primitives (FormField, Spinner, Badge...) | Low | 300 |
| useFreighterIdentity.ts | High | 70 |
| app/trades/create steps | High | 220 |
| mediator panel pages | Critical | 200 |
| contracts/grayfix_escrow | Critical | 400 |
| auth.middleware.ts | High | 60 |
| errorHandler.ts | Medium | 60 |
| logger.ts | Low | 50 |
| user.validators.ts | Medium | 40 |
| driver manifest form | Medium | 120 |
| VideoUploadCard.tsx | Low | 100 |

(This is a rapid inventory; refine with more focused scans.)

## CI/CD Integration

Tests are executed via GitHub Actions workflows in CI. Local commands:

- Backend: `pnpm test`
- Contract: `cargo test`

Coverage reports are generated during CI runs and can be published to a coverage dashboard (e.g., Codecov or Coveralls) via the CI workflow.

---

## How this matrix was generated

- Quick inventory of `backend/src`, `frontend/src`, and `contracts/` folders.
- Marked tests present where `__tests__` entries or `*.test.*` files exist.
- Rows with ✗ indicate no tests detected by a cursory scan and should be validated.

---

If you'd like, I can now refine this matrix (remove false positives, add exact LOC, and open a PR). Quick next step: run a repo-wide test-file search and update rows automatically.
