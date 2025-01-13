import CustomImage from "@/components/ui/custom-image";
import { RatingCircle } from "@/components/ui/rating-circle/rating-circle";
import { TrendingMovies } from "@/types/api";

export default function TrendingCarouselItem({
  data,
}: {
  data: TrendingMovies;
}) {
  return (
    <div className="relative group">
      <div className="flex flex-col justify-center items-center bg-transparent rounded-md overflow-hidden">
        <div className="rounded-md relative">
          <CustomImage
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${data.poster_path}`}
            alt={data.title}
            width="250"
            height="288"
            className="w-full h-72 rounded-md object-cover object-center hover:scale-110 transition-transform duration-300"
            placeholderSrc={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${data.poster_path}`}
          />
          <RatingCircle
            customStyles={{
              root: {
                position: "absolute",
                top: "0",
                right: "0",
                width: "40px",
                height: "40px",
              },
            }}
            background
            value={Number.parseFloat((data.vote_average * 10).toPrecision(1))}
          />
        </div>
        <p className="text-foreground py-4 text-start">{data.title}</p>
      </div>
    </div>
  );
}
