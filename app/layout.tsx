import "./globals.css";
import { font } from "@/app/fonts";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "StockTracker - Real-Time Stock Market Insights",
  description:
    "Stay ahead in the stock market with StockTracker. Get real-time data, trends, and analysis for your favorite companies. Track your investments and make informed decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
