import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keystone Intel | AI Infrastructure for Elite Real Estate Brokers",
  description: "Premium AI-powered research, analysis, and intelligence services for high-producing real estate professionals. We do the research. You close the deals.",
  keywords: ["real estate AI", "CMA automation", "property research", "due diligence", "market analysis", "real estate intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
