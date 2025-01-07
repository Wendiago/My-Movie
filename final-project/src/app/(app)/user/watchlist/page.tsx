import React from "react";
import Watchlist from "./_components/watchlist";

export default function page() {
  return (
    <div className="container py-6">
      <div className="w-full items-center">
        <h1 className="font-bold text-2xl pb-6 pt-2">My Watchlist</h1>
      </div>
      <Watchlist />
    </div>
  );
}
