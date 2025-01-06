"use server";

import { revalidateTag } from "next/cache";
import { addToFavoriteList, removeFromFavoriteList } from "./favorite-list";

export async function addToFavoriteListServerAction(movieID: number) {
  const response = await addToFavoriteList(movieID);
  revalidateTag("get-movie-detail");
  return response;
}

export async function removeFromFavoriteListServerAction(movieID: number) {
  const response = await removeFromFavoriteList(movieID);
  revalidateTag("get-movie-detail");
  return response;
}
