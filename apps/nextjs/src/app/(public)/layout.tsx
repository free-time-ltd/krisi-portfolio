import FontsVariable from "~/app/Fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={FontsVariable}>
      <body>{children}</body>
    </html>
  );
}
