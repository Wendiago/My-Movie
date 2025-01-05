import { Badge } from "@/components/ui/badge";
import CustomImage from "@/components/ui/customImage";
import { Movie } from "@/types/api";
import Image from "next/image";
import { CirclePlay } from "lucide-react";

export default function TrailerCarouselItem({ data }: { data: Movie }) {
  return (
    <div className="p-1 relative group">
      <div className="flex flex-col justify-center items-center bg-transparent rounded-md">
        <div className="rounded-md relative">
          <CustomImage
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${data?.poster_path}`}
            alt={data?.title}
            width="250"
            height="170"
            className="w-[250px] h-[170px] rounded-md object-cover object-center"
          />
          <Badge className="absolute top-0 right-0 rounded-none rounded-tr-md ">
            {data?.vote_average?.toPrecision(2)}
          </Badge>
          <CirclePlay
            width={40}
            height={40}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="text-background py-4 text-start">{data.title}</p>
      </div>
    </div>
  );
}
