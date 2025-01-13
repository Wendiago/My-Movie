import { Badge } from "@/components/ui/badge";
import { RatingCircle } from "@/components/ui/rating-circle/rating-circle";
import { Separator } from "@/components/ui/separator";
import { TrendingMovies } from "@/types/api";
import { cn } from "@/utils/cn";
import React from "react";

export default function MovieOverview({
  className,
  data,
}: {
  className?: string;
  data: TrendingMovies;
}) {
  if (!data) {
    return <div></div>;
  }
  return (
    <div
      className={cn(
        className,
        "flex flex-col max-w-[40%] absolute top-[20%] left-[7%]"
      )}
    >
      <h1 className="text-[3rem] lg:text-[4rem]  font-extrabold text-foreground line-clamp-2">
        {data.title}
      </h1>
      <div className="pb-4">
        <Badge variant="outline" className="text-foreground">
          {data.media_type}
        </Badge>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <RatingCircle
          value={Number.parseFloat((data.vote_average * 10).toPrecision(1))}
          customStyles={{
            root: { display: "block", width: "60px", height: "60px" },
          }}
        />
        <Separator orientation="vertical" />
        <p className="text-foreground">{data.release_date}</p>
        {data.adult && (
          <>
            <Separator orientation="vertical" />
            <Badge variant="outline">18</Badge>
            <Separator orientation="vertical" />
          </>
        )}
      </div>
      <p className="text-foreground line-clamp-3">{data.overview}</p>
    </div>
  );
}
