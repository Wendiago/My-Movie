import { Suspense } from "react";
import { getMovieDetail } from "@/api/movie/movie";
import MovieInfo from "./_components/movie-info";
import { ErrorBoundary } from "react-error-boundary";
export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieDetailResponse = getMovieDetail(movieID);

  return (
    <div className="pl-16 w-full flex flex-col pb-60">
      <ErrorBoundary
        fallback={
          <div className="flex justify-center items-center flex-1">
            No movie found
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center">
              <p className="text-xl">Loading</p>
            </div>
          }
        >
          <MovieInfo data={movieDetailResponse} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
