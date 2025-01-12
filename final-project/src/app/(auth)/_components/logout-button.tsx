"use client";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const handleLogout = () => {};
  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="text-background"
    >
      Log out
    </Button>
  );
}
