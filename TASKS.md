# NIVOX Delivery Roadmap

This roadmap is ordered by risk and dependency. Major implementation begins only after approval.

## Phase 0 — Baseline and decisions

- [x] Inventory current source tree and active entry path.
- [x] Identify active and inactive routing architectures.
- [x] Record current build and lint status.
- [x] Document product, design, and engineering standards.
- [ ] Confirm product decisions listed in `PRODUCT.md`.
- [ ] Confirm production environments, owners, and release workflow.
- [ ] Define acceptance criteria and priority for the first implementation phase.

## Phase 1 — Security and data integrity

- [ ] Add a Firebase auth provider with an initialization state.
- [ ] Define authoritative roles and administrative permissions.
- [ ] Protect the admin route.
- [ ] Replace broad Firestore rules with owner/admin-scoped rules.
- [ ] Add Firebase Emulator Suite rules tests.
- [ ] Design a trusted backend boundary using Cloud Functions or an approved API.
- [ ] Replace simulated payment with verified Paystack initialization and webhooks.
- [ ] Make reservation creation atomic and race-safe.
- [ ] Define idempotency, refund, cancellation, and no-show behavior.
- [ ] Prevent clients from forging paid reservations and administrative events.

## Phase 2 — Active runtime defects

- [ ] Initialize `useNavigate` in `BookingModal`.
- [ ] Correct cancellation to target the authoritative reservation collection.
- [ ] Restore missing admin broadcast state or disable the incomplete feature until implemented.
- [ ] Implement verification-email resend.
- [ ] Add functional sign-out.
- [ ] Handle all relevant login and Firebase errors.
- [ ] Enforce the confirmed cancellation window.
- [ ] Connect system pricing, duration, and capacity settings to the booking experience.
- [ ] Add branded route and feature error boundaries.

## Phase 3 — Architecture consolidation

- [ ] Select and retain one router architecture.
- [ ] Review the 47 modules currently unreachable from `main.jsx`.
- [ ] Remove dead code only after confirming it has no intended owner or migration value.
- [ ] Consolidate the parallel UI component systems.
- [ ] Move duplicated Firebase operations into an active feature service layer.
- [ ] Centralize workspace, seat, price, duration, and category definitions.
- [ ] Split oversized dashboard, booking, admin, events, spaces, and about components.
- [ ] Establish import aliases and feature boundaries.
- [ ] Replace the template README with setup, architecture, Firebase, and deployment instructions.

## Phase 4 — Quality baseline

- [ ] Resolve the 169 current ESLint errors in reviewable batches.
- [ ] Add a formatting command and agreed formatter configuration.
- [ ] Add unit tests for utilities and business rules.
- [ ] Add component tests for critical states.
- [ ] Add end-to-end tests for authentication, booking, cancellation, tickets, and admin authorization.
- [ ] Add CI for lint, build, tests, and Firestore rules tests.
- [ ] Add environment validation and separate development/staging/production configuration.
- [ ] Add error monitoring and privacy-aware operational logging.

## Phase 5 — UX and accessibility

- [x] Automatically scroll routes to the top.
- [x] Provide a branded lazy-route loader.
- [ ] Audit every active page at mobile, tablet, and desktop widths.
- [ ] Add shared loading, skeleton, empty, and error patterns.
- [ ] Implement the approved premium NIVOX logo loader without artificial delays.
- [ ] Upgrade shared modal accessibility and focus behavior.
- [ ] Replace non-semantic clickable containers.
- [ ] Add accessible labels to icon-only controls.
- [ ] Respect reduced-motion preferences throughout.
- [ ] Test keyboard navigation and screen-reader landmarks.
- [ ] Validate color contrast against WCAG 2.2 AA.

## Phase 6 — Complete student workflows

- [ ] Implement membership enrollment and entitlement rules.
- [ ] Complete real resource storage and downloads.
- [ ] Connect opportunity applications to approved destinations.
- [ ] Implement event registration, capacity, reminders, and attendance.
- [ ] Implement mentor/office-hours scheduling.
- [ ] Finalize persistent student ID and QR behavior.
- [ ] Add notification ordering, pagination, and realtime updates where appropriate.
- [ ] Add student notification preferences.
- [ ] Add account data export and deletion workflows.

## Phase 7 — Complete operations workflows

- [ ] Replace placeholder seat auditor with actual live occupancy.
- [ ] Implement scalable broadcast delivery through a trusted backend.
- [ ] Add paginated reservation, payment, and student administration.
- [ ] Add role-appropriate admin navigation and dashboards.
- [ ] Implement reports and aggregate metrics.
- [ ] Implement audit-log integrity and retention.
- [ ] Enforce maintenance mode across relevant routes and mutations.
- [ ] Add multi-location support if approved.

## Phase 8 — Partnerships and growth

- [ ] Connect newsletter/waitlist to an approved service.
- [ ] Persist and route partner, sponsor, university, and corporate inquiries.
- [ ] Replace simulated social actions with approved destinations.
- [ ] Define lead ownership, consent language, and response SLAs.
- [ ] Add privacy-compliant analytics for the approved success measures.

## Phase 9 — Performance and release readiness

- [ ] Analyze and reduce the current approximately 1 MB main JavaScript chunk.
- [ ] Separate public, authenticated, Firebase-heavy, and admin bundles.
- [ ] Optimize remote images and add responsive dimensions/formats.
- [ ] Remove artificial homepage loading delay.
- [ ] Bound Firestore reads with limits, indexes, cursors, and aggregates.
- [ ] Run Lighthouse and Web Vitals testing on representative devices.
- [ ] Perform security, accessibility, and production-readiness reviews.
- [ ] Document rollback, incident response, backup, and deployment procedures.

## Approval gate

No major feature phase should begin until its product decisions, security implications, acceptance criteria, and rollout approach are approved.
