import localFont from "@next/font/local";
import { Roboto, Roboto_Mono } from "@next/font/google";

export const c2ymRegular = localFont({
  src: "./fonts/C2ym-Regular.woff2",
  display: "swap",
  variable: "--font-c2ym",
});

export const RobotoFont = Roboto({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const RobotoMono = Roboto_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default `${c2ymRegular.variable} ${RobotoFont.variable} ${RobotoMono.variable}`;
