"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingOverlay from "@/components/ui/loading/loading-overlay";
import { SolarSystem } from "@/components/ui/loading/solar-system";

function LoginGoogleButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center gap-3 flex-1 border bg-secondary rounded-md py-2 group cursor-pointer"
        onClick={handleLoginWithGoogle}
      >
        <Image src="/google.svg" alt={"Google"} width={24} height={24} />
        <p className="group-hover:opacity-80">Log in with Google</p>
      </div>
      {isLoading && <LoadingOverlay spinner={<SolarSystem />} />}
    </>
  );
}

export default LoginGoogleButton;
