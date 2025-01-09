import { ApiResponse } from "@/types/auth";
import { useState, useEffect } from "react";
import wretch from "wretch";

interface User {
  name: string | null;
  email: string | null;
  photo: string | null;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = wretch("/api/access/user").get().json<User>();

        const data: User = await response;
        setUser(data);
      } catch (error: any) {
        const errorReponse: ApiResponse<null> = error?.json || {};

        setError(errorReponse.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    error,
  };
}
