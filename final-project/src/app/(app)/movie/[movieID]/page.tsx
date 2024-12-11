import Image from "next/image";
import MovieDetail from "./_components/movie-detail";
// import MovieEpisodes from "./_components/movie-episodes";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
import { type MovieDetails } from "@/types/api";
import { getMovieDetail } from "@/api/movie/movie";

export default async function page({
  params,
}: {
  params: Promise<{ movieID: string }>;
}) {
  const movieID = (await params).movieID;
  //console.log(movieID);
  let movieDetail: MovieDetails | null = null;

  const leftLayerStyle = {
    backgroundImage:
      "linear-gradient(270deg, rgba(17, 19, 25, 0) 0%, rgba(17, 19, 25, 0.05) 16%, rgba(17, 19, 25, 0.2) 30%, rgba(17, 19, 25, 0.39) 43%, rgba(17, 19, 25, 0.61) 55%, rgba(17, 19, 25, 0.8) 68%, rgba(17, 19, 25, 0.95) 82%, rgb(17, 19, 25) 98%)",
  };
  const bottomLayerStyle = {
    backgroundImage:
      "linear-gradient(179deg, rgba(17, 19, 25, 0) 1%, rgba(17, 19, 25, 0.05) 17%, rgba(17, 19, 25, 0.2) 31%, rgba(17, 19, 25, 0.39) 44%, rgba(17, 19, 25, 0.61) 56%, rgba(17, 19, 25, 0.8) 69%, rgba(17, 19, 25, 0.95) 83%, rgb(17, 19, 25) 99%)",
  };

  try {
    const response = await getMovieDetail(movieID);
    //console.log(response);
    if (response.success) {
      movieDetail = response.data;
      //console.log(movieDetail.production_countries);
      console.log(movieDetail.spoken_languages);
    } else {
      console.error(response.message);
      movieDetail = null;
    }
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    movieDetail = null;
  }

  if (!movieDetail) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-foreground">
        <p className="text-background text-xl">Unable to load movie details.</p>
      </div>
    );
  }

  return (
    <div className="lg:pl-16 w-full flex flex-col bg-foreground pb-60">
      <div className="flex w-full min-h-screen relative">
        <div className="overflow-hidden absolute top-0 right-0 w-[70.84%] h-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}${movieDetail.backdrop_path}`}
            alt={movieDetail.title}
            height={576}
            width={1000}
            className="object-cover w-full h-full"
          />
          <div
            className="left-layer absolute h-full w-[28%] bottom-0"
            style={leftLayerStyle}
          ></div>
          <div
            className="bottom-layer absolute w-full h-[36%] bottom-0"
            style={bottomLayerStyle}
          ></div>
        </div>
      </div>
      <div className="w-full -mt-[40%] z-30 flex flex-col gap-3">
        <MovieDetail data={movieDetail} />
        {/* <div className="pr-16">
          <Tabs defaultValue="episodes" className="">
            <TabsList className="grid grid-cols-2 max-w-[20%] bg-foreground">
              <TabsTrigger
                value="episodes"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:border-b-primary bg-foreground rounded-none"
              >
                Episodes
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:font-bold data-[state=active]:border-b-4 data-[state=active]:border-b-primary bg-foreground rounded-none"
              >
                Recommended
              </TabsTrigger>
            </TabsList>
            <Separator className="mb-4" />
            <TabsContent value="episodes">
              <MovieEpisodes />
            </TabsContent>
            <TabsContent value="recommended">
              <MovieEpisodes />
            </TabsContent>
          </Tabs>
        </div> */}
      </div>
    </div>
  );
}
