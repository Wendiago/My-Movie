import React from "react";
import MainCarousel from "./_components/main-carousel";
import SubCarousel from "./_components/sub-carousel";
import { Movie } from "@/types/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTodayTrendingMovies,
  getWeekTrendingMovies,
} from "@/api/movie/movie";

const getTodayTrendingMovie = async () => {
  const response = await getTodayTrendingMovies();
  return response;
};

const getWeeklyTrendingMovie = async () => {
  const response = await getWeekTrendingMovies();
  return response;
};

export default async function Page() {
  let todayTrendingMovie: Movie[] | null = null;
  let weeklyTrendingMovies: Movie[] | null = null;

  try {
    const response = await getTodayTrendingMovie();
    console.log(response);
    if (response.success) {
      todayTrendingMovie = response.data.results;
      console.log(todayTrendingMovie);
    } else {
      console.error(response.message);
      todayTrendingMovie = null;
    }
  } catch (error) {
    console.error("Error fetching today trending movies:", error);
    todayTrendingMovie = null;
  }

  try {
    const response = await getWeeklyTrendingMovie();
    if (response.success) {
      weeklyTrendingMovies = response.data.results;
    } else {
      console.error(response.message);
      weeklyTrendingMovies = null;
    }
  } catch (error) {
    console.error("Error fetching weekly trending movies:", error);
    weeklyTrendingMovies = null;
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <MainCarousel data={todayTrendingMovie} />
      <div className="pb-24 z-30 -mt-52 w-full flex flex-col justify-center items-center bg-gradient-to-b from-transparent via-foreground/70 via-[10%] to-foreground to-[15%] gap-8">
        <SubCarousel
          carouselName="Popular in Wendiago Movie"
          data={todayTrendingMovie}
        />

        <Tabs defaultValue="Today">
          <div className="flex items-center gap-3 ml-8 mb-6">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-bold text-2xl animate-fire-flicker">
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
            <SubCarousel data={todayTrendingMovie} />
          </TabsContent>
          <TabsContent value="This week">
            <SubCarousel data={weeklyTrendingMovies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
