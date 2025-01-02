"use client";

import CustomImage from "@/components/ui/customImage";
import { useRouter } from "next/navigation";

type Cast = {
  adult: boolean;
  gender?: number; // 0: Unknown, 1: Female, 2: Male
  id: number;
  known_for_department?: string; // Example: Acting, Writing
  name: string;
  original_name: string;
  popularity?: number;
  profile_path?: string; // Profile image path
  cast_id?: number;
  character?: string; // Character played
  credit_id?: string;
  order?: number; // Order in credits
};

type Crew = {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department?: string; // Example: Directing, Production
  name: string;
  original_name: string;
  popularity?: number;
  profile_path?: string; // Profile image path
  credit_id?: string;
  department?: string; // Department, e.g., Production
  job?: string; // Job role, e.g., Director
};

type CastInfoItem = {
  data: Cast | Crew;
  isCast: boolean;
};

export default function CastInfoItem({ data, isCast }: CastInfoItem) {
  const router = useRouter();
  // Narrow the type based on `isCast`
  const description = isCast ? (data as Cast).character : (data as Crew).job;
  return (
    <div
      className="flex gap-4 items-center cursor-pointer"
      onClick={() => router.push(`/person/${data.id}`)}
    >
      <CustomImage
        src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w300${data.profile_path}`}
        alt={data.name}
        width="66"
        height="80"
        className="w-[66px] h-[80px] rounded-md"
      ></CustomImage>
      <div className="flex flex-col justify-center items-start">
        <h1 className="font-bold">{data.name}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
