import React from "react";
import RatingList from "./_components/rating-list";

export default function page() {
  return (
    <div className="px-16 py-6 flex-1 flex flex-col">
      <div className="w-full items-center">
        <h1 className="font-bold text-2xl pb-6 pt-2">My Ratings</h1>
      </div>
      <RatingList />
    </div>
  );
}
