import CustomImage from "@/components/ui/custom-image";
import { Movie } from "@/types/api";
import { Play } from "lucide-react";

export default function TrailerCarouselItem({ data }: { data: Movie }) {
  return (
    <div className="relative group">
      <div className="flex flex-col justify-center items-center bg-transparent rounded-md">
        <div className="rounded-md relative">
          <CustomImage
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${data?.poster_path}`}
            alt={data?.title}
            width="315"
            height="176"
            className="w-[315px] h-[176px] rounded-md object-cover object-center"
          />
          <Play
            width={40}
            height={40}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground fill-foreground opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="py-4 text-start font-semibold">{data.title}</p>
      </div>
    </div>
  );
}
