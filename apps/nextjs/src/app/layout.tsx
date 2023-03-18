import FontsVariable from "./Fonts";

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
