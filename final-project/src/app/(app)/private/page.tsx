"use client";
import { useLogout } from "@/api/auth/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { paths } from "@/lib/routes";
import { Popcorn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PrivatePage() {
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
    <div className="flex flex-col min-h-screen">
      <nav className="sticky py-4 px-6 bg-primary flex justify-between items-center">
        <div className="flex gap-1">
          <Popcorn className="text-primary-foreground" />
          <p className="font-semibold text-primary-foreground">MY MOVIE</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Log out
        </Button>
      </nav>
      <section className="w-full flex-1 flex justify-center items-center font-semibold text-lg">
        <Image
          src="/maintanance.gif"
          alt="maintanance"
          width={800}
          height={500}
        ></Image>
      </section>
    </div>
  );
}
