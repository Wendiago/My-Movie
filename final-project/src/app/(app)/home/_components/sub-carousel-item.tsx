import { Badge } from "@/components/ui/badge";
import { SubCarouselMovie } from "@/types/api";
import Image from "next/image";

export default function SubCarouselItem({ data }: { data: SubCarouselMovie }) {
  return (
    <div className="p-1 relative group">
      <div className="flex flex-col justify-center items-center bg-foreground rounded-md">
        <div className="rounded-md relative">
          <Image
            src={data.imgURL}
            alt="sub-carousel"
            width={250}
            height={288}
            className="w-full h-72 rounded-md object-cover object-center"
          ></Image>
          {data.status && (
            <Badge className="absolute top-0 right-0 rounded-md">
              {data.status}
            </Badge>
          )}
        </div>
        <p className="text-background py-4 text-start">{data.name}</p>
      </div>
    </div>
  );
}
