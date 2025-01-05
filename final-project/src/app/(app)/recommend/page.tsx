import { Suspense } from "react";
import RecommendResults from "./_components/recommend-result";

export default function RecommendPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="pt-[72px] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <RecommendResults />
        </Suspense>
      </div>
    </div>
  );
}
