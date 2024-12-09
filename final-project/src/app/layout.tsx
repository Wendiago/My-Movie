import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Final web project",
  description: "",
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
