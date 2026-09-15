# Daniel Isaac Miller — Design System

Single source of truth for the design system shared by:

- `danielmiller.design` (professional)
- `danielisaacmiller.com` (art / gallery)

## What lives here

| File | Purpose |
| --- | --- |
| `tokens.css` | Color, type, and base tokens (Tailwind v4 `@theme`) |
| `fonts.ts` | `next/font` definitions — Outfit + JetBrains Mono |
| `components/` | Style-guide primitives (`Section`, `Swatch`) |
| `index.ts` | Public exports |

## Consuming it

Each site adds this repo as a **git submodule** at `design-system/`.

### `app/globals.css`

```css
@import "tailwindcss";
@import "../design-system/tokens.css";
```

### Fonts (`app/layout.tsx`)

```tsx
import { mono, sans } from "@/design-system/fonts";
```

### Components

```tsx
import { Section, Swatch } from "@/design-system";
```

Tailwind scans the submodule automatically (it is tracked, not ignored), so
classes used in shared components are generated without an `@source` directive.

## Editing the system

Change it **here**, then sync consumers:

```bash
git subtree pull --prefix=design-system <this-repo-url> main --squash
```

or, if used as a submodule:

```bash
git submodule update --remote design-system
```
