# NIVOX Engineering Guide

## Project intent

NIVOX is an existing production-oriented React application for a student innovation hub. Extend the current codebase; do not replace it, generate a second application, or redesign it from scratch.

The product tagline is **Shaping Tomorrow, Today.**

## Current stack

- React 19 and Vite
- Tailwind CSS 4
- React Router
- Framer Motion
- Firebase Authentication and Cloud Firestore
- Lucide React
- React Hot Toast

## Source of truth

The active application entry path is:

`src/main.jsx` → `src/App.jsx` → `src/routes/router.jsx`

The active shared route layout is:

`src/components/common/layout/Layout.jsx`

`src/app/routes/router.jsx` and most layouts under `src/app/layouts` are an incomplete, inactive architecture. Do not build new work on that router unless a separately approved migration makes it the sole application architecture.

## Change policy

1. Inspect the active route, its parents, shared components, and data flow before editing.
2. Make the smallest safe change that meets the requirement.
3. Preserve existing NIVOX branding, content, responsive behavior, and working functionality.
4. Do not delete existing components unless their replacement is approved and verified.
5. Do not silently rewrite unrelated code or discard existing working-tree changes.
6. Keep business logic out of large page components when adding new behavior; prefer feature services and focused hooks.
7. Reuse an existing component before creating another component with the same purpose.
8. Treat Firebase client configuration as public identifiers, but keep secrets and privileged operations off the client.

## Required engineering standards

- Mobile-first responsive implementation.
- Semantic HTML and keyboard-accessible interactions.
- Visible focus states, accessible names, and appropriate ARIA semantics.
- Reusable components with clear, narrow responsibilities.
- Loading, empty, success, and error states for asynchronous features.
- No intentional white-screen states. Route and feature failures must provide a branded fallback.
- Route navigation starts at the top through `src/components/common/ScrollToTop.jsx`.
- Motion must be purposeful, performant, and respectful of reduced-motion preferences.
- Avoid duplicated constants, workspace data, Firebase queries, and design primitives.
- Prefer bounded Firestore queries, pagination, batched writes, and transactions where correctness requires them.
- Privileged actions must be authorized by Firestore rules or a trusted backend, never only by client UI.

## UI implementation rules

- Preserve the deep-purple, gold, white, and glass-surface design language documented in `DESIGN.md`.
- Extend existing radius, shadow, typography, and motion patterns instead of introducing a competing visual system.
- Start at the smallest viewport and verify common mobile, tablet, and desktop widths.
- Decorative absolute-positioned elements must use `pointer-events-none`.
- Fixed overlays must support short viewports, touch scrolling, focus management, Escape dismissal, and a clear close action.
- Avoid clickable `div` elements; use buttons or links unless there is a compelling semantic reason.

## Firebase and product safety

- Do not claim payment success without server-side provider verification.
- Do not trust a role stored in editable client data for administrative authorization.
- Reservation creation must eventually use an atomic, race-safe design.
- Do not broaden Firestore access rules to work around a client-side bug.
- Use Firebase Emulator Suite and rules tests before deploying security-rule changes.

## Verification expectations

For application-code changes:

1. Run targeted ESLint on changed files.
2. Run `npm run build`.
3. Run relevant automated tests when available.
4. Manually verify the affected flow at mobile and desktop widths when UI behavior changes.
5. Report pre-existing failures separately from regressions caused by the change.

Current repository-wide lint is not clean; do not hide that fact. Improving lint should be handled in bounded, reviewable batches.

## Documentation maintenance

Update documentation when a change affects:

- Active routes or application architecture
- Product scope or feature status
- Design tokens or interaction patterns
- Security assumptions
- Roadmap status or dependencies

Unresolved product choices must be marked **Decision needed** rather than guessed.
