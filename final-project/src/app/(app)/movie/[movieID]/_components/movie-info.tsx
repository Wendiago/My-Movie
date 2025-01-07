"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GetMovieDetailResponse } from "@/types/api";
import { Bookmark, ChevronRight, Heart, List, Star } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomImage from "@/components/ui/custom-image";
import {
  useAddToFavoriteListServer,
  useRemoveFromFavoriteListServer,
} from "@/api/user/favorite-list";
import { toast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import {
  useAddToWatchlistServerAction,
  useRemoveFromWatchlistServerAction,
} from "@/api/user/watch-list";

const TooltipArrow = TooltipPrimitive.Arrow;
export default function MovieInfo({
  data,
}: {
  data: Promise<GetMovieDetailResponse>;
}) {
  const movieDetail = use(data).data;
  const partialCast = movieDetail?.credits?.cast
    ?.slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 10);
  const router = useRouter();
  const leftLayerStyle = {
    backgroundImage:
      "linear-gradient(270deg, rgba(17, 19, 25, 0) 0%, rgba(17, 19, 25, 0.05) 16%, rgba(17, 19, 25, 0.2) 30%, rgba(17, 19, 25, 0.39) 43%, rgba(17, 19, 25, 0.61) 55%, rgba(17, 19, 25, 0.8) 68%, rgba(17, 19, 25, 0.95) 82%, rgb(17, 19, 25) 98%)",
  };
  const bottomLayerStyle = {
    backgroundImage:
      "linear-gradient(179deg, rgba(17, 19, 25, 0) 1%, rgba(17, 19, 25, 0.05) 17%, rgba(17, 19, 25, 0.2) 31%, rgba(17, 19, 25, 0.39) 44%, rgba(17, 19, 25, 0.61) 56%, rgba(17, 19, 25, 0.8) 69%, rgba(17, 19, 25, 0.95) 83%, rgb(17, 19, 25) 99%)",
  };

  // Favorite mutations
  const addToFavoriteMutation = useAddToFavoriteListServer({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Added to favorite",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to add to favorite",
        description: error.message,
      });
    },
  });

  const removeFromFavoriteListMutation = useRemoveFromFavoriteListServer({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Removed from favorite list",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to remove from favorite list",
        description: error.message,
      });
    },
  });

  const handleOnFavoriteButtonClick = () => {
    if (!movieDetail.isFavorite) {
      addToFavoriteMutation.mutate(movieDetail.tmdb_id);
    } else {
      removeFromFavoriteListMutation.mutate(movieDetail.tmdb_id);
    }
  };

  // Watchlist mutations
  const addToWatchlistMutation = useAddToWatchlistServerAction({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Added to watchlist",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to add to watchlist",
        description: error.message,
      });
    },
  });

  const removeFromWatchlistMutation = useRemoveFromWatchlistServerAction({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Removed from watchlist",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail to remove from watchlist",
        description: error.message,
      });
    },
  });

  const handleOnBookmarkButtonClick = () => {
    if (!movieDetail.isWatching) {
      addToWatchlistMutation.mutate(movieDetail.tmdb_id);
    } else {
      removeFromWatchlistMutation.mutate(movieDetail.tmdb_id);
    }
  };

  return movieDetail ? (
    <>
      <div className="flex w-full relative">
        <div className="overflow-hidden absolute top-0 right-0 w-[70.84%] h-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movieDetail.backdrop_path}`}
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
        <div className="w-full mt-[10%] z-30 flex flex-col gap-3">
          <div className="flex flex-col w-[500px] mb-8">
            <h1 className="text-[2rem] font-semibold text-foreground mb-3">
              {movieDetail.title}
            </h1>
            <div className="flex items-center gap-2 h-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-yellow-500" />
                <p className="text-yellow-500 font-semibold">
                  {movieDetail.vote_average.toPrecision(2)}
                </p>
              </div>
              <Separator orientation="vertical" />
              <p className="text-foreground">{movieDetail.release_date}</p>
              {movieDetail.adult && (
                <>
                  <Separator orientation="vertical" />
                  <Badge variant="outline">18</Badge>
                  <Separator orientation="vertical" />
                </>
              )}

              <p className="text-foreground">{movieDetail.original_language}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {movieDetail.genres?.map((genre, index) => (
                <Badge
                  variant="outline"
                  key={index}
                  className="text-foreground"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-foreground">
                <span className="text-textGrey">Duration: {""}</span>
                {movieDetail.runtime} {""}min
              </p>
              <p className="text-foreground">
                <span className="text-textGrey">Budget: {""}</span>
                {movieDetail.budget ? `$${movieDetail.budget}` : "-"}
              </p>
              <p className="text-foreground">
                <span className="text-textGrey">
                  Production Companies: {""}
                </span>
                {movieDetail.production_companies?.map(
                  (productionCompany) => productionCompany.name + ", "
                ) || "-"}
              </p>
              {/* add to prevent overflow max-h-[63px] line-clamp-2 */}
              <p className="text-foreground">
                <span className="text-textGrey">Overview: {""}</span>
                {movieDetail.overview}
              </p>
              <div className="flex gap-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex justify-center items-center rounded-full w-12 h-12"
                        variant="secondary"
                      >
                        <List />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to list</p>
                      <TooltipArrow className="fill-primary"></TooltipArrow>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex justify-center items-center rounded-full w-12 h-12"
                        onClick={handleOnFavoriteButtonClick}
                        disabled={
                          addToFavoriteMutation.isPending ||
                          removeFromFavoriteListMutation.isPending
                        }
                        variant="secondary"
                      >
                        {addToFavoriteMutation.isPending ||
                        removeFromFavoriteListMutation.isPending ? (
                          <Spinner variant="light" />
                        ) : movieDetail.isFavorite ? (
                          <Heart
                            fill="hsl(var(--favorite))"
                            color="hsl(var(--favorite))"
                          />
                        ) : (
                          <Heart fill="hsl(var(--foreground))" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {movieDetail.isFavorite ? (
                        <p className="py-2">Remove from favorite</p>
                      ) : (
                        <p className="py-2">Mark as favorite</p>
                      )}
                      <TooltipArrow className="fill-primary"></TooltipArrow>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex justify-center items-center rounded-full w-12 h-12"
                        variant="secondary"
                        onClick={handleOnBookmarkButtonClick}
                        disabled={
                          addToWatchlistMutation.isPending ||
                          removeFromWatchlistMutation.isPending
                        }
                      >
                        {addToWatchlistMutation.isPending ||
                        removeFromWatchlistMutation.isPending ? (
                          <Spinner variant="light" />
                        ) : movieDetail.isWatching ? (
                          <Bookmark
                            fill="hsl(var(--watching))"
                            color="hsl(var(--watching))"
                          />
                        ) : (
                          <Bookmark fill="hsl(var(--foreground))" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {movieDetail.isWatching ? (
                        <p className="py-2">Remove from your watchlist</p>
                      ) : (
                        <p className="py-2">Add to your watchlist</p>
                      )}
                      <TooltipArrow className="fill-primary"></TooltipArrow>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-foreground font-semibold text-xl mb-3">
          Top Billed Cast
        </p>
        <div className="w-full pr-16">
          <ScrollArea className="w-full">
            <div className="flex gap-4 w-max pr-8 pb-8">
              {partialCast.map((cast, index) => (
                <div
                  key={index}
                  className="rounded-md cursor-pointer w-[145px]"
                  onClick={() => router.push(`/person/${cast.id}`)}
                >
                  <CustomImage
                    src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w185${cast.profile_path}`}
                    alt={cast.name}
                    width="145"
                    height="217"
                    className="rounded-t-md w-full h-[217px]"
                  />
                  <div className="flex-col gap-1 text-foreground justify-center items-center p-3 w-full h-[6rem]">
                    <p className="w-full font-bold leading-6">{cast.name}</p>
                    <p className="w-full leading-6 text-sm line-clamp-3 text-ellipsis">
                      {cast.character}
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="flex text-foreground items-center justify-center font-bold cursor-pointer"
                onClick={() =>
                  router.push(`/movie/${movieDetail.tmdb_id}/cast`)
                }
              >
                View full
                <ChevronRight />
              </div>
            </div>
            <ScrollBar orientation="horizontal"></ScrollBar>
          </ScrollArea>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center flex-1">
      No movie found
    </div>
  );
}
