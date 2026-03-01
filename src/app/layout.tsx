import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreNova AI | Where Intelligence Meets Performance",
  description: "CoreNova AI is a high-performance AI Work Intelligence Platform that transforms documents into actionable workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Toaster position="top-right" toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'white',
            border: '1px solid var(--border)',
          },
          success: { iconTheme: { primary: 'var(--accent)', secondary: 'white' } },
        }} />
      </body>
    </html>
  );
}
