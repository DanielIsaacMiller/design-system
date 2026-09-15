import { JetBrains_Mono, Outfit } from "next/font/google";

export const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jetbrains",
  display: "swap",
});
