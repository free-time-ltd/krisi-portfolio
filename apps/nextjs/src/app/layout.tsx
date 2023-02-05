import localFont from "@next/font/local";
import { Roboto, Roboto_Mono } from "@next/font/google";

const c2ymRegular = localFont({
  src: "./fonts/C2ym-Regular.woff2",
  display: "swap",
  variable: "--font-c2ym",
});

const RobotoFont = Roboto({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

const RobotoMono = Roboto_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${c2ymRegular.variable} ${RobotoFont.variable} ${RobotoMono.variable}`}
    >
      <body>
        <main className="main-col">{children}</main>
        <footer className="relative z-10 flex flex-col text-white">
          <div className="flex flex-col justify-between bg-[#1D1D1D] px-[5vw] py-[4vh] sm:flex-row">
            <div className="sm:mw-[25vw] w-full sm:flex-1">
              Logo &amp; Terms
            </div>
            <div className="sm:mw-[25vw] w-full sm:flex-1">Helpful Links</div>
            <div className="sm:mw-[25vw] w-full sm:flex-1">
              Follow me on Facebook
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
