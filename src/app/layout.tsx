import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "../app/components/Navbar"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Verdea Store",
  description: "Verdea Store | Fresh & Delicious",
    viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className={cn("font-sans", geist.variable )}>
 <head>

</head>

      <body className="min-h-full flex flex-col bg-mainP-500">
        <Navbar/>
        {children}</body>
    </html>

  );
}
