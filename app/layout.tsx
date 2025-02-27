import type { Metadata } from "next";
import { Sarabun } from "next/font/google"; 
import "./_styles/globals.css";
import { ToastProvider } from "./components/Toast/ToastContext";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Firebase Auth Starter",
  description: "A starter template for Firebase Authentication with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sarabun.className}`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
