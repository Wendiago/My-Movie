import { getMovieDetail } from "@/api/movie/movie";
import { Suspense } from "react";
import ReviewInfo from "../_components/review-info";
import ReviewInfoSkeleton from "../_components/review-info-skeleton";

export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieInfo = getMovieDetail(movieID);
  return (
    <div className="w-full mt-[72px] flex flex-col flex-1">
      <Suspense fallback={<ReviewInfoSkeleton />}>
        <ReviewInfo data={movieInfo} />
      </Suspense>
    </div>
  );
}
