"use client";

import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGenres } from "@/api/genre/genre";

interface Genre {
  id: string;
  name: string;
}

export default function GenreFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { data: genres } = useGenres();
  const [selectValue, setSelectValue] = useState(
    searchParams.get("genres") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleGenreSelect = useCallback(
    (genre: string | null) => {
      router.push(pathName + "?" + createQueryString("genres", genre));
    },
    [createQueryString, pathName, router]
  );

  return (
    <Select
      value={selectValue}
      onValueChange={(value) => {
        setSelectValue(value);
        handleGenreSelect(value);
      }}
    >
      <SelectTrigger
        className={`w-[120px] bg-background/80 text-foreground pl-4 h-[40px] backdrop-blur-md `}
      >
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        {genres?.data?.map((genre: Genre) => (
          <SelectItem key={genre.id} value={genre.name}>
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
