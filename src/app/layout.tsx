import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VideoProvider } from "@/contexts/VideoContext";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Catflix - Entertainment for Cats",
  description: "The ultimate streaming platform for cats. Watch birds, fish, laser pointers, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-netflix-black text-netflix-white min-h-screen`}
      >
        <VideoProvider>
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </VideoProvider>
      </body>
    </html>
  );
}
