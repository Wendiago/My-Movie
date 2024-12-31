import { Suspense } from "react";
import { getMovieDetail } from "@/api/movie/movie";
import MovieInfo from "./_components/movie-info";
export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieDetailResponse = getMovieDetail(movieID);

  return (
    <div className="pl-16 w-full flex flex-col bg-foreground pb-60">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-foreground">
            <p className="text-background text-xl">Loading</p>
          </div>
        }
      >
        <MovieInfo data={movieDetailResponse} />
      </Suspense>
    </div>
  );
}
