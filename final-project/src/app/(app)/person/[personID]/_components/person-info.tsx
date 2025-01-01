"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GetCastByIDResponse } from "@/types/api";
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
      </div>
      <div className="px-8 min-w-0">
        <h1 className="font-bold text-4xl text-background">{person.name}</h1>

        {/* Bio section */}
        <section className="mt-8">
          <h3 className="font-bold text-background text-xl mb-3">Biography</h3>
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
          <h3 className="font-bold text-background text-xl mb-3">Known For</h3>
          <div className="w-full pr-16">
            <ScrollArea className="w-full">
              <div className="flex gap-4 max-w pr-8 pb-8">
                {person.movie_credits.cast.map((movie, index) => (
                  <div
                    key={index}
                    className="rounded-md cursor-pointer w-[130px] flex flex-col"
                    onClick={() => router.push(`/movie/${movie.id}`)}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w185${movie.poster_path}`}
                      alt={movie.title}
                      width="130"
                      height="195"
                      className="rounded-t-md w-full h-[195px]"
                    ></Image>
                    <div className="flex-1 mx-auto text-center text-background p-3 w-full font-light">
                      {movie.title}
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>
          </div>
        </section>
      </div>
    </div>
  );
}
