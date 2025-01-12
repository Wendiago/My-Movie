export const dynamic = "force-dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTodayTrendingMovies,
  getWeekTrendingMovies,
  getLatestTrailerList,
} from "@/api/movie/movie";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TrendingCarousel from "./home/_components/trending-carousel";
import TrendingCarouselSkeleton from "./home/_components/trending-carousel-skeleton";
import MainCarousel from "./home/_components/main-carousel";
import TrailerCarousel from "./home/_components/trailer-carousel";
import TrailerCarouselSkeleton from "./home/_components/trailer-carousel-skeleton";
export default async function Page() {
  const weeklyTrendingMovies = getWeekTrendingMovies();
  const todayTrendingMovies = getTodayTrendingMovies();
  const latestTrailerList = getLatestTrailerList();

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <Suspense
        fallback={
          <Skeleton className="flex justify-center items-center h-screen"></Skeleton>
        }
      >
        <MainCarousel data={todayTrendingMovies} />
      </Suspense>

      <div className="w-full pb-24 z-30 -mt-52 flex flex-col justify-center gap-8 items-center bg-gradient-to-b from-transparent via-background/70 via-[10%] to-background to-[15%]">
        <div
          className="container"
          style={{
            backgroundImage: `url('/trending.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "bottom center",
          }}
        >
          <Tabs defaultValue="Today" className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <p className="font-bold text-2xl">TRENDING</p>
              <TabsList className="grid grid-cols-2 max-w-[30%] bg-transparent">
                <TabsTrigger
                  value="Today"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Today
                </TabsTrigger>
                <TabsTrigger
                  value="This week"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  This week
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="Today">
              <Suspense fallback={<TrendingCarouselSkeleton />}>
                <TrendingCarousel data={todayTrendingMovies} />
              </Suspense>
            </TabsContent>
            <TabsContent value="This week">
              <Suspense fallback={<TrendingCarouselSkeleton />}>
                <TrendingCarousel data={weeklyTrendingMovies} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
        <Suspense fallback={<TrailerCarouselSkeleton />}>
          <TrailerCarousel
            carouselName="Latest Trailers"
            data={latestTrailerList}
          />
        </Suspense>
        <div className="container">
          <Suspense fallback={<TrendingCarouselSkeleton />}>
            <TrendingCarousel
              carouselName="Popular in Wendiago Movie"
              data={todayTrendingMovies}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
