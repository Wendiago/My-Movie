"use client";
import { useRemoveFromFavoriteList } from "@/api/user/favorite-list";
import { Button } from "@/components/ui/button";
import CustomImage from "@/components/ui/custom-image";
import { RatingCircle } from "@/components/ui/rating-circle";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";
import { Movie } from "@/types/api";
import { formatDate } from "@/utils/utils";
import { List, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import StarRating from "../../_components/star-rating";
import { useAddToRatingList } from "@/api/user/rating-list";

type FavoriteMovieItemProps = Pick<
  Movie,
  | "_id"
  | "tmdb_id"
  | "title"
  | "backdrop_path"
  | "poster_path"
  | "overview"
  | "genres"
  | "release_date"
  | "runtime"
  | "vote_average"
  | "vote_count"
  | "popularity"
> & {
  isWatching?: boolean;
  rating?: number;
};
export default function FavoriteMovieItem({
  data,
}: {
  data: FavoriteMovieItemProps;
}) {
  const [isStarRatingOpen, setStarRatingOpen] = useState(false);
  const starRatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        starRatingRef.current &&
        !starRatingRef.current.contains(event.target as Node)
      ) {
        setStarRatingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const router = useRouter();
  const removeFromFavoriteListMutation = useRemoveFromFavoriteList({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Removed from favorite list",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to remove from favorite list",
        description: error.message,
      });
    },
  });

  const rateMovieMutation = useAddToRatingList({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Rated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to rate",
        description: error.message,
      });
    },
  });

  const handleRemoveFromFavorite = (idMovie: number) => {
    removeFromFavoriteListMutation.mutate(idMovie);
  };

  const handleOpenStarRating = () => {
    setStarRatingOpen(!isStarRatingOpen);
  };

  const handleOnMovieRate = (rating: number) => {
    setStarRatingOpen(false);
    rateMovieMutation.mutate({ movieID: data.tmdb_id, rating: rating });
  };

  return (
    <div className="w-full flex border rounded-md">
      <CustomImage
        src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w220_and_h330_face${data.poster_path}`}
        width={133}
        height={200}
        alt={data.title}
        className="h-[200px] w-[133px] rounded-tl-md rounded-bl-md cursor-pointer"
        onClick={() => router.push(`/movie/${data.tmdb_id}`)}
      />
      <div className="px-[15px] py-[10px] flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <RatingCircle
            progress={
              typeof data.vote_average === "number"
                ? Number.parseFloat((data.vote_average * 10).toPrecision(1))
                : 0
            }
            size={40}
            textClassName="font-semibold text-[12px] text-foreground"
            strokeWidth={3}
          />
          <div>
            <h1 className="font-bold text-xl">{data.title}</h1>
            <p className="text-textGrey font-light">
              {data.release_date != null ? formatDate(data.release_date) : "-"}
            </p>
          </div>
        </div>
        <div className="">{data.overview}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 relative">
            <Button
              size="icon"
              variant={data.rating != null ? "default" : "outline"}
              className="text-textGrey border-foreground/50 rounded-full w-7 h-7"
              onClick={handleOpenStarRating}
            >
              {data.rating != null ? (
                <p className="text-foreground text-center mx-auto">
                  {(data.rating * 100) / 5}
                </p>
              ) : (
                <Star />
              )}
            </Button>
            <div className="text-textGrey">Rate it!</div>
            {isStarRatingOpen && (
              <StarRating
                ref={starRatingRef}
                onRating={handleOnMovieRate}
                className="absolute top-[-130%] translate-x-[15%]"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="text-textGrey border-foreground/50 rounded-full w-7 h-7"
              onClick={() => handleRemoveFromFavorite(data.tmdb_id)}
              disabled={removeFromFavoriteListMutation.isPending}
            >
              {removeFromFavoriteListMutation.isPending ? <Spinner /> : <X />}
            </Button>
            <div className="text-textGrey">Remove</div>
          </div>
        </div>
      </div>
    </div>
  );
}
