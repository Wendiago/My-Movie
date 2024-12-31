import { getTodayTrendingMovies } from "@/api/movie/movie";
import MainCarousel from "./main-carousel";

export default async function MainCarouselServer() {
  const todayTrendingMovie = (await getTodayTrendingMovies()).data;
  return <MainCarousel data={todayTrendingMovie} />;
}
