import { Suspense } from "react";
import CastInfo from "../_components/cast-info";
import { getMovieDetail } from "@/api/movie/movie";

export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  const movieInfo = getMovieDetail(movieID);
  return (
    <div className="w-full bg-foreground mt-[72px] flex flex-col flex-1">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-foreground">
            <p className="text-background text-xl">Loading</p>
          </div>
        }
      >
        <CastInfo data={movieInfo} />
      </Suspense>
    </div>
  );
}
