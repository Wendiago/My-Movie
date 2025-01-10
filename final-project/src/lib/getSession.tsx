import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export async function getSessionData() {
  if (typeof window === "undefined") {
    // Server-side: Use auth to retrieve the session
    return await auth();
  }
  // Client-side: Use getSession to retrieve the session
  return await getSession();
}
