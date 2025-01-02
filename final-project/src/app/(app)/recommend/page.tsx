import { Suspense } from "react";
import RecommendResults from "./_components/recommend-result";

export default function RecommendPage() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-foreground pt-[72px]">
        <Suspense fallback={<div>Loading...</div>}>
          <RecommendResults />
        </Suspense>
      </div>
    </div>
  );
};
