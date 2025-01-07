import { Suspense } from "react";
import SearchResults from "./_components/search-results";

export default function SearchPage() {
  return (
    <div className="flex-1 pt-[72px] ">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
