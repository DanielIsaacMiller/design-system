import type { StaticImageData } from "next/image";

import darkLogo from "./assets/DM-Logo-Dark.svg";
import lightLogo from "./assets/DM-Logo-Light.svg";

export type BrandTone = "dark" | "light";

export const logos: Record<BrandTone, StaticImageData> = {
  dark: darkLogo,
  light: lightLogo,
};

export const brand = {
  alt: "Daniel Miller",
  size: 62,
  logos,
};

export const faviconIcons = {
  icon: [
    { url: logos.dark.src, type: "image/svg+xml" },
    {
      url: logos.light.src,
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: logos.dark.src,
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};
