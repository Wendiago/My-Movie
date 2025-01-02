import { Badge } from "@/components/ui/badge";
import CustomImage from "@/components/ui/customImage";
import { Movie } from "@/types/api";
import Image from "next/image";

export default function TrendingCarouselItem({ data }: { data: Movie }) {
  return (
    <div className="p-1 relative group">
      <div className="flex flex-col justify-center items-center bg-transparent rounded-md">
        <div className="rounded-md relative">
          <CustomImage
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${data.poster_path}`}
            alt={data.title}
            width="250"
            height="288"
            className="w-full h-72 rounded-md object-cover object-center"
          />
          <Badge className="absolute top-0 right-0 rounded-none rounded-tr-md ">
            {data.vote_average.toPrecision(2)}
          </Badge>
        </div>
        <p className="text-background py-4 text-start">{data.title}</p>
      </div>
    </div>
  );
}
