"use client";

import CustomImage from "@/components/ui/customImage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GetCastByIDResponse } from "@/types/api";
import { calculateAge, formatDate } from "@/utils/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

export default function PersonInfo({
  data,
}: {
  data: Promise<GetCastByIDResponse>;
}) {
  const person = use(data).data;
  const router = useRouter();
  const [isBioOverflowing, setBioOverflowing] = useState(false);
  const [isBioExpanded, setBioExpanded] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    if (bioRef.current) {
      setBioOverflowing(
        bioRef.current.scrollHeight > bioRef.current.clientHeight
      );
    }
  }, []);

  const { formattedDate, age } = calculateAge(person.birthday);
  const birthDateString = `${formattedDate} (${age} years old)`;

  return (
    <div className="w-full grid grid-cols-[300px_1fr]">
      <div className="flex flex-col">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w300${person.profile_path}`}
          alt={person.name}
          width="300"
          height="450"
          className="w-full h-auto rounded-md"
        ></Image>
        <section className="flex flex-col mt-6">
          <h3 className="font-semibold text-background text-xl mb-3">
            Personal Info
          </h3>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Known For</h5>
            <p className="text-background">{person.known_for_department}</p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Known Credits</h5>
            <p className="text-background">
              {person.movie_credits.cast.length +
                person.movie_credits.crew.length}
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Gender</h5>
            <p className="text-background">
              {person.gender == 0
                ? "Unknown"
                : person.gender == 1
                  ? "Female"
                  : "Male"}
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Birthday</h5>
            <p className="text-background">{birthDateString}</p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Deathday</h5>
            <p className="text-background">
              {person.deathday ? formatDate(person.deathday) : "-"}
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Place Of Birth</h5>
            <p className="text-background">{person.place_of_birth}</p>
          </div>
          <div className="flex flex-col mb-5">
            <h5 className="text-background font-bold">Also Known As</h5>
            <div className="flex flex-col gap-2">
              {person.also_known_as.map((name, index) => (
                <p key={index} className="text-background">
                  {name}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="px-8 min-w-0">
        <h1 className="font-bold text-4xl text-background">{person.name}</h1>

        {/* Bio section */}
        <section className="mt-8">
          <h3 className="font-semibold text-background text-xl mb-3">
            Biography
          </h3>
          <div
            className={`${isBioExpanded ? "" : "line-clamp-6 h-[192px]"}transition-all relative`}
            ref={bioRef}
          >
            {person.biography.split("\n\n").map((paragraph, index, array) => (
              <p
                key={index}
                className={`text-background ${index < array.length - 1 ? "mb-6" : ""}`}
              >
                {paragraph}
              </p>
            ))}
            {isBioOverflowing && (
              <p
                className="text-primary font-semibold flex justify-end items-center cursor-pointer w-[30%] right-0 absolute bottom-0 bg-gradient-to-r from-foreground/40 via-foreground/80 to-foreground"
                onClick={() => {
                  setBioExpanded(true);
                  setBioOverflowing(false);
                }}
              >
                Read More
                <ChevronRight />
              </p>
            )}
          </div>
        </section>
        {/* Known for section */}
        <section className="mt-8">
          <h3 className="font-semibold text-background text-xl mb-3">
            Known For
          </h3>
          <div className="w-full pr-16">
            <ScrollArea className="w-full">
              <div className="flex gap-4 max-w pr-8 pb-8">
                {person.movie_credits.cast.length > 0
                  ? person.movie_credits.cast.map((movie, index) => (
                      <div
                        key={index}
                        className="rounded-md cursor-pointer w-[130px] flex flex-col"
                        onClick={() => router.push(`/movie/${movie.id}`)}
                      >
                        <CustomImage
                          src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w185${movie.poster_path}`}
                          alt={movie.title}
                          width="130"
                          height="195"
                          className="rounded-t-md w-full h-[195px]"
                        />
                        <div className="flex-1 mx-auto text-center text-background m-3 w-full font-light line-clamp-3 text-ellipsis">
                          {movie.title}
                        </div>
                      </div>
                    ))
                  : null}

                {/* Check and render crew */}
                {person.movie_credits.crew.length > 0
                  ? person.movie_credits.cast.map((movie, index) => (
                      <div
                        key={index}
                        className="rounded-md cursor-pointer w-[130px] flex flex-col"
                        onClick={() => router.push(`/movie/${movie.id}`)}
                      >
                        <CustomImage
                          src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w185${movie.poster_path}`}
                          alt={movie.title}
                          width="130"
                          height="195"
                          className="rounded-t-md w-full h-[195px]"
                        />
                        <div className="flex-1 mx-auto text-center text-background m-3 w-full font-light line-clamp-3 text-ellipsis">
                          {movie.title}
                        </div>
                      </div>
                    ))
                  : null}

                {/* Show "No data available" only if both cast and crew are empty */}
                {person.movie_credits.cast.length === 0 &&
                  person.movie_credits.crew.length === 0 && (
                    <div>No data available</div>
                  )}
              </div>
              <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>
          </div>
        </section>
      </div>
    </div>
  );
}
