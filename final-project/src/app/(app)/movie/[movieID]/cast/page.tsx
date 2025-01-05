import { Suspense } from "react";
import CastInfo from "../_components/cast-info";
import { getMovieDetail } from "@/api/movie/movie";
import CastInfoSkeleton from "../_components/cast-info-skeleton";

export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieInfo = getMovieDetail(movieID);
  return (
    <div className="w-full mt-[72px] flex flex-col flex-1">
      <Suspense fallback={<CastInfoSkeleton />}>
        <CastInfo data={movieInfo} />
      </Suspense>
    </div>
  );
}
