import Footer from "@/components/layouts/footer/footer";
import NavBar from "@/components/layouts/nav-bar/nav-bar";
import AIChat from "@/components/ui/AI-chat/AI-chat";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="flex flex-col min-h-screen">
        <NavBar></NavBar>
        <main className="flex-1 flex">{children}</main>
        <Footer></Footer>
      </div>
      <AIChat />
    </div>
  );
}
