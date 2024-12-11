import { Badge } from "@/components/ui/badge";
import { Movie } from "@/types/api";
import Image from "next/image";

export default function SubCarouselItem({ data }: { data: Movie }) {
  return (
    <div className="p-1 relative group">
      <div className="flex flex-col justify-center items-center bg-transparent rounded-md">
        <div className="rounded-md relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}${data.poster_path}`}
            alt="sub-carousel"
            width={250}
            height={288}
            className="w-full h-72 rounded-md object-cover object-center"
          ></Image>
          <Badge className="absolute top-0 right-0 rounded-none rounded-tr-md ">
            {data.vote_average}
          </Badge>
        </div>
        <p className="text-background py-4 text-start">{data.title}</p>
      </div>
    </div>
  );
}
