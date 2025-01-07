"use server";

import { revalidateTag } from "next/cache";
import { addToWatchlist, removeFromWatchlist } from "./watch-list";

export async function addToWatchlistServerAction(movieID: number) {
  const response = await addToWatchlist(movieID);
  revalidateTag("get-movie-detail");
  return response;
}

export async function removeFromWatchlistServerAction(movieID: number) {
  const response = await removeFromWatchlist(movieID);
  revalidateTag("get-movie-detail");
  return response;
}
