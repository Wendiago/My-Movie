import MovieList from "./_components/movie-list";
import { getMoviesByGenre } from "@/api/movie/movie";
import { Movie } from "@/types/api";

export default async function GenrePage({
  params,
}: {
  params: Promise<{ genreID: string }>;
}) {
  const genreID = (await params).genreID;
  let movieList: Movie[];

  try {
    const response = await getMoviesByGenre(genreID);

    if (response.success) {
      movieList = response.data;
      console.log(movieList);
    } else {
      console.error(response.message);
      movieList = [];
    }
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    movieList = [];
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-foreground pt-[72px]">
        hello
      </div>
    </div>
  );
};
