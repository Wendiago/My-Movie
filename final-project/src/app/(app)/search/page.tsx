import { Suspense } from "react";
import SearchResults from "./_components/search-results";
import SearchResultsSkeleton from "./_components/search-results-skeleton";

export default function SearchPage() {
  return (
    <div className="flex-1 pt-[72px] ">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
