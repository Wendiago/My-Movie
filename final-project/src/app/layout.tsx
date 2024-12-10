import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Wendiago Movie",
  description: "Final project for advanced web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
