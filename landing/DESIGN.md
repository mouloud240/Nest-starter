# Design

## Theme

Dark, cinematic, technical editorial. The NestJS docs aesthetic: a near-black
stage with a deep red-to-black atmosphere, oversized display type, monospace
technical labels, and restraint everywhere else.

## Palette

| Token | Value |
| --- | --- |
| background | `#080808` |
| surface | `#111111` |
| surface-elevated | `#171717` |
| text-primary | `#ffffff` |
| text-secondary | `rgba(255,255,255,0.7)` |
| text-muted | `rgba(255,255,255,0.45)` |
| brand-dark | `#050303` |
| brand | `#780f20` |
| brand-light | `#a51d36` |
| accent-bright (links, caret) | `#e05a72` |
| border-subtle | `rgba(255,255,255,0.1)` |

Color strategy: committed. The brand red concentrates in the hero gradient
(`linear-gradient(90deg, #050303 0%, #780f20 50%, #050303 100%)`) and a single
radial glow behind the headline. Black carries the rest of the surface.

## Typography

- Display/body: Inter, fallback `system-ui`.
- Mono (labels, versions, machine facts): JetBrains Mono, fallback `ui-monospace`.
- Display XL: `clamp(3.5rem, 9vw, 7rem)`, line-height `0.95`, letter-spacing
  `-0.045em`, weight 500.
- Body: `clamp(1rem, 1.4vw, 1.15rem)`, line-height `1.7`, text-secondary.
- Technical label: mono `0.75rem`, letter-spacing `0.18em`, uppercase,
  text-muted.

## Radii

| Surface | Radius |
| --- | --- |
| Hero | 32px |
| Nav | 28px |
| Large surfaces | 20px |
| Buttons | 14px |
| Small controls / chips | 10px |

## Components

- **Nav** — floating translucent panel (`rgba(0,0,0,0.45)`, `backdrop-blur`),
  radius 28px, sits inside the hero at the top edge.
- **Buttons** — primary: solid white on near-black text; secondary: translucent
  white surface with a subtle hairline. No heavy shadows.
- **Metrics** — mono values with muted mono labels, in a row separated from the
  hero by a top hairline. No cards, no borders around each metric.
- **Docs** — Starlight with the dark NestJS palette, red accent, sidebar and
  search bar intact.

## Motion

- Staggered entrance on load: nav, kicker, headline, lede, CTAs, metrics —
  ease-out-expo style `cubic-bezier(0.22, 1, 0.36, 1)`, 100ms offsets,
  600–700ms durations.
- Continuous subtle film-grain animation over the hero background.
- Every animation disabled under `prefers-reduced-motion`.

## Layout

- Page padding-inline: `clamp(1rem, 3vw, 2.5rem)`.
- Hero: `min-height: 100svh`, centered column, stage `max-width: 1100px`.
- Metrics row: centered, wraps, gap `clamp(2rem, 6vw, 5rem)`.
