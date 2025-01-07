import { Suspense } from "react";
import RecommendResults from "./_components/recommend-result";

export default function RecommendPage() {
  return (
    <div className="pt-[72px] flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <RecommendResults />
      </Suspense>
    </div>
  );
}
