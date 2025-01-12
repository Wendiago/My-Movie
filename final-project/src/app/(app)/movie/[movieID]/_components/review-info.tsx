"use client";
import CustomImage from "@/components/ui/custom-image";
import { GetMovieDetailResponse } from "@/types/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import MovieReviewItem from "./movie-review-item";

export default function ReviewInfo({
  data,
}: {
  data: Promise<GetMovieDetailResponse>;
}) {
  const movieDetail = use(data).data;
  const movieReviews = use(data).reviews;
  const router = useRouter();
  return (
    <>
      <div
        className="w-full mx-auto bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movieDetail.backdrop_path})`,
        }}
      >
        <div className="container py-4 flex items-center gap-5">
          <CustomImage
            src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movieDetail.poster_path}`}
            alt={movieDetail.title}
            width="58"
            height="87"
            className="w-[58px] h-[87px]"
          ></CustomImage>
          <div className="flex flex-col gap-2">
            <h1 className="text-primary-foreground text-2xl font-extrabold">
              {movieDetail.title}
            </h1>
            <p
              className="text-textGrey font-bold flex items-center hover:text-primary-foreground cursor-pointer"
              onClick={() => router.push(`/movie/${movieDetail.tmdb_id}`)}
            >
              <ArrowLeft />
              Back to movie info
            </p>
          </div>
        </div>
      </div>

      <p className="container text-foreground font-semibold text-xl mt-8 mb-4">
        Reviews ({movieReviews.length})
      </p>

      <div className="container flex flex-col gap-4 flex-1 mb-8">
        {movieReviews && movieReviews.length > 0 ? (
          movieReviews.map((review, index) => (
            <MovieReviewItem data={review} key={index} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            No review for this movie
          </div>
        )}
      </div>
    </>
  );
}
