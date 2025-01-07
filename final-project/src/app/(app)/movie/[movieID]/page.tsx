import { Suspense } from "react";
import { getMovieDetail } from "@/api/movie/movie";
import MovieInfo from "./_components/movie-info";
import { ErrorBoundary } from "react-error-boundary";
import MovieInfoSkeleton from "./_components/movie-info-skeleton";
export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieDetailResponse = getMovieDetail(movieID);

  return (
    <div className="w-full flex flex-col pb-60">
      <ErrorBoundary
        fallback={
          <div className="flex justify-center items-center flex-1">
            No movie found
          </div>
        }
      >
        <Suspense fallback={<MovieInfoSkeleton />}>
          <MovieInfo data={movieDetailResponse} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
