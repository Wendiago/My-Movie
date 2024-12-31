export const dynamic = "force-dynamic";
import MainCarousel from "./_components/main-carousel";
import SubCarousel from "./_components/sub-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTodayTrendingMovies,
  getWeekTrendingMovies,
} from "@/api/movie/movie";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const todayTrendingMovie = getTodayTrendingMovies();
  //const weeklyTrendingMovies = getWeekTrendingMovies();

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      <Suspense
        fallback={
          <Skeleton className="w-full min-h-screen flex justify-center items-center"></Skeleton>
        }
      >
        <MainCarousel data={todayTrendingMovie} />
      </Suspense>

      <div className="pb-24 z-30 -mt-52 w-full flex flex-col justify-center items-center bg-gradient-to-b from-transparent via-foreground/70 via-[10%] to-foreground to-[15%] gap-8">
        <Suspense
          fallback={
            <Skeleton className="w-full flex justify-center items-center"></Skeleton>
          }
        >
          <SubCarousel
            carouselName="Popular in Wendiago Movie"
            data={todayTrendingMovie}
          />
        </Suspense>

        <Tabs defaultValue="Today">
          <div className="flex items-center gap-3 ml-8 mb-6">
            <p className="ml-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-bold text-2xl animate-fire-flicker">
              TRENDING
            </p>
            <TabsList className="grid grid-cols-2 max-w-[30%] bg-foreground">
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
            <Suspense
              fallback={
                <Skeleton className="w-full flex justify-center items-center"></Skeleton>
              }
            >
              <SubCarousel data={todayTrendingMovie} />
            </Suspense>
          </TabsContent>
          <TabsContent value="This week">
            <Suspense
              fallback={
                <Skeleton className="w-full flex justify-center items-center"></Skeleton>
              }
            >
              {/*<SubCarousel data={weeklyTrendingMovies} />*/}
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
