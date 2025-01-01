import Footer from "@/components/layouts/footer/footer";
import NavBar from "@/components/layouts/nav-bar/nav-bar";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <main className="flex-1 bg-foreground flex">{children}</main>
      <Footer></Footer>
    </div>
  );
}
