"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

function LoginGoogleButton() {
  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login/federated/google`;
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-center items-center gap-3 flex-1"
      onClick={handleGoogleLogin}
    >
      <Image src="/google.svg" alt={"Google"} width={24} height={24} />
      <p className="hover:text-primary">Log in with Google</p>
    </Button>
  );
}

export default LoginGoogleButton;
