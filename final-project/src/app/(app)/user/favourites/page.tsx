import React from "react";
import FavoriteLists from "./_components/favorite-list";

export default function page() {
  return (
    <div className="container py-6">
      <div className="w-full items-center">
        <h1 className="font-bold text-2xl pb-6 pt-2">My Favorites</h1>
      </div>
      <FavoriteLists />
    </div>
  );
}
