import localFont from "next/font/local";
import { Roboto_Mono, Roboto_Condensed } from "next/font/google";

export const c2ymRegular = localFont({
  src: "./fonts/C2ym-Regular.woff2",
  display: "swap",
  variable: "--font-c2ym",
});

export const RobotoFont = Roboto_Condensed({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "700"],
});

export const RobotoMono = Roboto_Mono({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
});

export default `${c2ymRegular.variable} ${RobotoFont.variable} ${RobotoMono.variable}`;
