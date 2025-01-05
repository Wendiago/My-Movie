export const dynamic = "force-dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTodayTrendingMovies,
  getWeekTrendingMovies,
} from "@/api/movie/movie";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TrendingCarousel from "./_components/trending-carousel";
import TrendingCarouselSkeleton from "./_components/trending-carousel-skeleton";
import MainCarousel from "./_components/main-carousel";

export default async function Page() {
  const weeklyTrendingMovies = getWeekTrendingMovies();
  const todayTrendingMovies = getTodayTrendingMovies();
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <Suspense
        fallback={
          <Skeleton className="w-full min-h-screen flex justify-center items-center"></Skeleton>
        }
      >
        <MainCarousel data={todayTrendingMovies} />
      </Suspense>

      <div className="pb-24 z-30 -mt-52 w-full flex flex-col justify-center items-center bg-gradient-to-b from-transparent via-background/70 via-[10%] to-background to-[15%] gap-8">
        <Tabs defaultValue="Today" className="w-full">
          <div className="flex items-center gap-3 ml-8 mb-6">
            <p className="ml-8 font-bold text-2xl">TRENDING</p>
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
        <Suspense fallback={<TrendingCarouselSkeleton />}>
          <TrendingCarousel
            carouselName="Popular in Wendiago Movie"
            data={todayTrendingMovies}
          />
        </Suspense>
      </div>
    </div>
  );
}
