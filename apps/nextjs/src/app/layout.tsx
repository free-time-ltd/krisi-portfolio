import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
