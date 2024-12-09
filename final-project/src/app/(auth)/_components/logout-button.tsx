"use client";
import { useLogout } from "@/api/auth/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogout({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Log out successfully",
        description: "Redirected to login page",
      });
      router.push(paths.auth.login.getHref());
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Log out failed",
        description: error.message,
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
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
