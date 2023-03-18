import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";

import "../../styles/admin.css";

// @todo how do I overwrite the global layout/template with this one?

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sess = await getServerSession(authOptions);

  if (sess === null) {
    redirect("/api/auth/signin");
  }

  return <section className="admin-panel">{children}</section>;
}
