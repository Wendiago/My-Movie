"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

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
