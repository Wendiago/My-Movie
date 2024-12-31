import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Movie } from "@/types/api";
import { cn } from "@/utils/cn";
import { Play, Star } from "lucide-react";
import React from "react";

export default function MovieOverview({
  className,
  data,
}: {
  className?: string;
  data: Movie;
}) {
  return (
    <div className={cn(className, "flex flex-col max-w-[40%]")}>
      <h1 className="md:text-[2rem] lg:text-[4rem] font-extrabold text-background line-clamp-2">
        {data.title}
      </h1>
      <div className="mb-4">
        <Badge>{data.popularity}</Badge>
      </div>
      <div className="flex items-center gap-2 h-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" />
          <p className="text-yellow-500 font-semibold">{data.vote_average}</p>
        </div>
        <Separator orientation="vertical" />
        <p className="text-background">{data.release_date}</p>
        <Separator orientation="vertical" />
        <p className="text-background">
          {data.adult ? "Adult" : "No restrict"}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {data.genres.map((genre, index) => (
          <Badge variant="outline" key={index}>
            {genre}
          </Badge>
        ))}
      </div>
      <p className="text-background line-clamp-2">{data.overview}</p>

      <div className="mt-6">
        <Button size="icon" className="rounded-full h-16 w-16 [&_svg]:size-8">
          <Play />
        </Button>
      </div>
    </div>
  );
}
