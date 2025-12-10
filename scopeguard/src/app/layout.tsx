import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCOPEGUARD v1.0 [BETA]",
  description: "Document Analysis Tool for Elevator Project Managers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#fdf6e3] text-[#657b83] min-h-screen">
        {children}
      </body>
    </html>
  );
}
