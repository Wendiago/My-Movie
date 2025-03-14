"use client";

import CustomImage from "@/components/ui/custom-image";
import { GetMovieDetailResponse } from "@/types/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import CastInfoItem from "./cast-info-item";

export default function CastInfo({
  data,
}: {
  data: Promise<GetMovieDetailResponse>;
}) {
  const movieDetail = use(data).data;
  const router = useRouter();
  if (!movieDetail) {
    return <div>Something is wrong</div>;
  }
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
            placeholderSrc={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movieDetail.poster_path}`}
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
      <div className="container py-8 grid grid-cols-2 gap-x-2 md:gap-x-0">
        <div className="flex flex-col">
          <h3 className="text-foreground font-bold text-xl mb-5">
            Cast{" "}
            <span className="text-textGrey font-medium">
              {movieDetail.credits.cast.length}
            </span>
          </h3>
          <div className="flex flex-col gap-4">
            {movieDetail.credits.cast.map((cast, index) => (
              <CastInfoItem data={cast} isCast={true} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-foreground font-bold text-xl mb-5">
            Crew{" "}
            <span className="text-textGrey font-medium">
              {movieDetail.credits.crew.length}
            </span>
          </h3>
          <div className="flex flex-col gap-8">
            {movieDetail.credits.crew.find(
              (person) => person.department == "Directing"
            ) && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Directing</h3>
                {movieDetail.credits.crew
                  .filter((person) => person.department == "Directing")
                  .map((person, index) => (
                    <CastInfoItem data={person} isCast={false} key={index} />
                  ))}
              </div>
            )}
            {movieDetail.credits.crew.find(
              (person) => person.department == "Production"
            ) && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Production</h3>
                {movieDetail.credits.crew
                  .filter((person) => person.department == "Production")
                  .map((person, index) => (
                    <CastInfoItem data={person} isCast={false} key={index} />
                  ))}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Others</h3>
              {movieDetail.credits.crew
                .filter(
                  (person) =>
                    person.department != "Directing" &&
                    person.department != "Production"
                )
                .map((person, index) => (
                  <CastInfoItem data={person} isCast={false} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
