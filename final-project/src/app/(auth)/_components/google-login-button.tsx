"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

function LoginGoogleButton() {
  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-center items-center gap-3 flex-1"
      onClick={handleLoginWithGoogle}
    >
      <Image src="/google.svg" alt={"Google"} width={24} height={24} />
      <p className="hover:text-primary">Log in with Google</p>
    </Button>
  );
}

export default LoginGoogleButton;
