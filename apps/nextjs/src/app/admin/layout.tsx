import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "~/app/AuthContext";
import FontsVariable from "~/app/Fonts";

import "../../styles/globals.css";

const getSession = async (cookie: string): Promise<Session> => {
  const response = await fetch(
    `${process.env.LOCAL_AUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("kp_sess") ?? "");

  return (
    <html lang="en" className={FontsVariable}>
      <body>
        <AuthContext session={session}>
          <main className="main-col">
            <section className="main-content">{children}</section>
          </main>
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
        </AuthContext>
      </body>
    </html>
  );
}
