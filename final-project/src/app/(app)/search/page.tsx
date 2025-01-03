import { Suspense } from "react";
import SearchResults from "./_components/search-results";

export default function SearchPage() {
  return (
    <div className="flex flex-col pt-[72px] w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
