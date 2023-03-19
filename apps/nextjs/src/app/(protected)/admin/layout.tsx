import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import FontsVariable from "~/app/Fonts";

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
        <main className="admin-panel">{children}</main>
      </body>
    </html>
  );
}
