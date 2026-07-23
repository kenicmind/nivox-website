# NIVOX Design System

## Brand foundation

NIVOX should feel ambitious, premium, youthful, technologically capable, and welcoming. The design should communicate a credible innovation hub rather than a generic software dashboard.

**Tagline:** Shaping Tomorrow, Today.

## Existing visual language

The current application consistently uses:

- Deep purple foundations and gradients
- Gold/yellow calls to action and highlights
- White and soft lavender text/surfaces
- Rounded cards, pills, and controls
- Translucent glass surfaces with soft borders
- Atmospheric radial gradients and blurred light forms
- Lucide outline icons
- Short Framer Motion entrances and interactive feedback

New work must extend this language rather than introduce an unrelated theme.

## Core colors

Current recurring values:

| Role | Value | Usage |
|---|---:|---|
| Primary purple | `#2B0A5A` | Brand, dark controls, primary identity |
| Deep background | `#140726` | Application background and modal surfaces |
| Darkest purple | `#0C031C` | Gradient depth |
| Accent gold | `#FFD54A` | Primary CTA, focus, active state |
| Soft gold | `#FFE7A3` | Secondary highlight text |
| White | `#FFFFFF` | Primary text on dark surfaces |

Supporting emerald, red, amber, and purple tones are used for status communication.

**Decision needed:** Formalize semantic color tokens and contrast-tested light-theme values before adding another theme.

## Typography

The current interface relies on the system/Tailwind sans stack with:

- Heavy, compact display headings
- Medium or semibold control labels
- Small uppercase labels with wide tracking
- Comfortable body line height

Guidelines:

- Use one `h1` per page.
- Keep mobile heading sizes readable without forced wrapping.
- Do not use uppercase tracking for long sentences.
- Keep body copy contrast at WCAG AA levels.

**Decision needed:** Confirm whether NIVOX has a licensed or preferred brand typeface.

## Shape and surface

- Primary cards: approximately `24px–36px` radius
- Inputs and buttons: rounded pills or `12px–20px` radius
- Borders: subtle white/purple transparency
- Glass surfaces: translucent fill, backdrop blur, restrained shadows
- Page sections: generous vertical spacing with tighter mobile spacing

Glass treatment must not reduce readability or create excessive GPU work on low-powered mobile devices.

## Layout

- Build mobile-first.
- Use the established centered content widths, generally up to `max-w-7xl`.
- Preserve consistent page gutters: compact on mobile, progressively larger on tablet/desktop.
- Cards collapse to one column on small screens.
- Avoid fixed heights for content-driven sections.
- Fixed headers and overlays must account for safe areas and short viewports.

## Components

The active reusable visual components primarily live under:

- `src/components/design/ui`
- `src/components/design/forms`
- `src/components/design/feedback`
- `src/components/common`

Before creating a component:

1. Check whether an active equivalent exists.
2. Improve the existing component when doing so will not break its consumers.
3. Avoid adding to the inactive parallel `src/components/ui` system.

Target primitives should eventually include one canonical implementation of:

- Button
- Card and glass surface
- Container and section wrapper
- Input, select, textarea, checkbox, and autocomplete
- Modal, drawer, confirmation dialog, toast, and tooltip
- Loading, empty, and error states
- Tabs and pagination

## Motion

Motion should reinforce hierarchy and state:

- Short fade/translate entrances
- Subtle button and card press feedback
- Smooth but restrained section reveals
- No animation that blocks interaction
- Avoid continuous decorative animation on many simultaneous elements
- Respect `prefers-reduced-motion`

Recommended duration bands:

- Microinteraction: `120–200ms`
- Dialog/page element entrance: `180–350ms`
- Large storytelling transition: `400–700ms`

## Navigation and page behavior

- Every route starts at the top via `ScrollToTop`.
- Lazy route loading uses a branded fallback rather than a white screen.
- The fixed navbar must never cover focus targets or page headings.
- Active navigation state must be visually and programmatically clear.
- Mobile navigation must close after selection and must not leave invisible hit-blocking layers.

## Loading experience plan

Do not fully implement until approved.

### Concept

A premium NIVOX loader built around the existing circular logo:

1. Deep-purple full-surface background, never plain white.
2. Logo enters with a restrained fade and scale.
3. A thin gold orbital ring or progress trace animates around it.
4. “NIVOX” and “Shaping Tomorrow, Today.” appear beneath with subtle stagger.
5. Motion resolves quickly and transitions into content without a flash.

### Usage levels

- **App/route loader:** Centered brand mark for lazy-route transitions.
- **Section skeleton:** Geometry matching the destination layout.
- **Inline spinner:** Compact control-level progress.
- **Progressive image state:** Branded neutral placeholder.

### Constraints

- No artificial delay solely to show the animation.
- Reduced-motion mode uses a static logo and simple opacity change.
- The loader must not trap users indefinitely.
- Errors replace loading with a clear recovery action.
- Logo asset dimensions should be explicit to avoid layout shift.

**Decision needed:** Approve the exact loader animation, maximum display behavior, and whether the logo asset requires a higher-resolution/transparent variant.

## Accessibility baseline

- Target WCAG 2.2 AA.
- Keyboard-accessible menus, dialogs, tabs, forms, and cards.
- Visible focus states using the gold accent with sufficient contrast.
- Proper dialog roles, labels, focus trap, focus return, and Escape behavior.
- Semantic buttons and links rather than clickable generic containers.
- Text alternatives for meaningful imagery.
- Status must never be communicated by color alone.
- Minimum practical touch target of approximately 44×44 CSS pixels.

## Content voice

- Clear, confident, optimistic, and student-centered.
- Prefer concrete benefits over vague technology claims.
- Use Nigerian currency and local context consistently.
- Avoid claiming a workflow is live when it is simulated or planned.
