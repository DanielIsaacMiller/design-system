# Daniel Isaac Miller — Design System

Single source of truth for the design system shared by:

- `danielmiller.design` (professional)
- `danielisaacmiller.com` (art / gallery)
- `blob`, `hydrangea`, `tone-viewer` (pieces)

## What lives here

| Path | Purpose |
| --- | --- |
| `theme.css` | Color *roles* + font tokens + base styles (Tailwind v4 `@theme`) |
| `fonts.ts` | `next/font` definitions — Outfit + JetBrains Mono |
| `brand/` | Canonical logos (`assets/`), `brand.ts`, `<Logo />`, `faviconIcons` |
| `cursor/` | `engine.ts`, `<Cursor />`, `cursor.css` (`cursor: none` rules) |
| `color/` | `resolveCssColor()` — a CSS colour (oklch included) as a `THREE.Color` |
| `components/` | Style-guide primitives (`Section`, `Swatch`) |
| `index.ts` | Public exports |

Color **values** live in each app, not here — `theme.css` only maps roles
(`--background`, `--foreground`, `--muted`, `--accent`, `--line`,
`--cursor-color`) to Tailwind theme tokens.

`color/` is intentionally *not* re-exported from `index.ts`: it imports three,
and a site that only wants the logo or the cursor shouldn't pull in a
renderer. Import it as `@design-system/color`. It exists because
`getComputedStyle` hands back `lab(...)` for an oklch token, which three's own
parser reads as an unknown colour and leaves white — so a piece can drive its
scene background from its token without caring what notation that token uses.

## Consuming it

Each site adds this repo as a **git submodule** at `design-system/` and adds a
`@design-system/*` path alias in `tsconfig.json`.

### `app/globals.css`

```css
@import "tailwindcss";
@import "../design-system/theme.css";
@import "../design-system/cursor/cursor.css";

:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --cursor-color: var(--foreground);
}
```

(From `src/app/`, use `../../design-system/…`.)

### Layout

```tsx
import { Cursor, faviconIcons, Logo } from "@design-system";
import { mono, sans } from "@design-system/fonts";

export const metadata = { /* ... */ icons: faviconIcons };
```

```tsx
<Logo tone="dark" glow />
<Cursor color="var(--cursor-color)" />
```

Tailwind scans the submodule automatically (it is tracked, not ignored).

## Editing the system

Change it **here**, commit + push, then in each consumer:

```bash
git submodule update --remote design-system
```

Then commit the pointer. (A dirty submodule working tree will block the
checkout — use `git submodule update --force --remote design-system`.)
