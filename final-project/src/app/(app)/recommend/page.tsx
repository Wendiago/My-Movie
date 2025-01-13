import { Suspense } from "react";
import RecommendResults from "./_components/recommend-result";
import SearchResultsSkeleton from "../search/_components/search-results-skeleton";

export default function RecommendPage() {
  return (
    <div className="pt-[72px] flex-1">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <RecommendResults />
      </Suspense>
    </div>
  );
}
