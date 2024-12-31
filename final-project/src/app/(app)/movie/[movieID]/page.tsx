import { Suspense } from "react";
import MovieInfoServer from "./_components/movie-info.server";
export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;

  return (
    <div className="lg:pl-16 w-full flex flex-col bg-foreground pb-60">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-foreground">
            <p className="text-background text-xl">Loading</p>
          </div>
        }
      >
        <MovieInfoServer movieID={movieID} />
      </Suspense>
    </div>
  );
}
