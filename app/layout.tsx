import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micro-SaaS 10本同時検証ポータル",
  description: "Micro-SaaSの需要検証用ランディングページ群",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
