"use client";

import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import wretch from "wretch";
import React from "react";
import LoadingOverlay from "@/components/ui/loading/loading-overlay";
import { SolarSystem } from "@/components/ui/loading/solar-system";

export const SignOutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    handleLogOut();
  });

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await wretch("/api/access/logout").post().json();

      toast({
        variant: "destructive",
        title: "Refresh token has been revoked",
        description: "You need to log in again",
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      await signOut();
      router.push("/login");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl">Logging out...</h1>
      {isLoading && <LoadingOverlay spinner={<SolarSystem />} />}
    </>
  );
};
