import { customFetch } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Get all genres
export const getAllGenres = async (): Promise<any> => {
  try {
    const response = await customFetch.get("/api/v1/genres");
    return response;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error("Failed to fetch genres.");
  }
};

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenres,
    staleTime: 1000 * 60 * 60,
  });
};