import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import FontsVariable from "~/app/Fonts";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "~/styles/admin.css";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sess = await getServerSession(authOptions);

  if (sess === null || sess.user.role !== "Administrator") {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en" className={FontsVariable}>
      <body>
        <main className="admin-panel">
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <Sidebar />
          <article className="content">{children}</article>
          <section className="footer text-center">
            Copyrighted &copy; {new Date().getFullYear()}
          </section>
        </main>
      </body>
    </html>
  );
}
