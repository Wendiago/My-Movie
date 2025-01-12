import { Suspense } from "react";
import { getMovieDetail } from "@/api/movie/movie";
import MovieInfo from "./_components/movie-info";
import MovieInfoSkeleton from "./_components/movie-info-skeleton";
import { getRecommendationBasedSelection } from "@/api/recommend/recommend";
import MovieRecommendation from "./_components/movie-recommendation";
import MovieRecommendationSkeleton from "./_components/movie-recommendation-skeleton";
import { Separator } from "@/components/ui/separator";
export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieDetailResponse = getMovieDetail(movieID);
  const MovieRecommendationResponse = getRecommendationBasedSelection(movieID);

  return (
    <div className="w-full flex flex-col pb-20 flex-1">
      <Suspense fallback={<MovieInfoSkeleton />}>
        <MovieInfo data={movieDetailResponse} />
      </Suspense>
      <div className="container mt-4 mb-8">
        <Separator />
      </div>
      <Suspense fallback={<MovieRecommendationSkeleton />}>
        <MovieRecommendation data={MovieRecommendationResponse} />
      </Suspense>
    </div>
  );
}
