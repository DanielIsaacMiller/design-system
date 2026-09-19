import Image from "next/image";

import { brand, logos, type BrandTone } from "./brand";

const GLOW: Record<BrandTone, string> = {
  dark: "drop-shadow(0 0 6px rgba(255,255,255,0.75)) drop-shadow(0 0 28px rgba(237,237,237,0.45))",
  light:
    "drop-shadow(0 0 6px rgba(30,35,46,0.55)) drop-shadow(0 0 24px rgba(85,92,106,0.4))",
};

export function Logo({
  tone = "dark",
  href = "/",
  alt = brand.alt,
  glow = false,
  className = "",
}: {
  tone?: BrandTone;
  href?: string | null;
  alt?: string;
  glow?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={logos[tone]}
      alt={alt}
      width={brand.size}
      height={brand.size}
      priority
      unoptimized
      style={glow ? { filter: GLOW[tone] } : undefined}
    />
  );

  const position =
    `fixed left-8 top-8 z-20 sm:left-10 sm:top-10 ${className}`.trim();

  if (!href) {
    return <span className={position}>{image}</span>;
  }

  return (
    <a href={href} aria-label={alt} className={`${position} cursor-pointer`}>
      {image}
    </a>
  );
}
