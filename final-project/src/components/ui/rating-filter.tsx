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

export default function RatingFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectValue, setSelectValue] = useState(
    searchParams.get("rating") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleRatingSelect = useCallback(
    (rating: string | null) => {
      router.push(pathName + "?" + createQueryString("rating", rating));
    },
    [createQueryString, pathName, router]
  );

  return (
    <Select
      value={selectValue}
      onValueChange={(value) => {
        setSelectValue(value);
        handleRatingSelect(value);
      }}
    >
      <SelectTrigger
        className={`w-[120px] bg-background/80 text-foreground pl-4 h-[40px] backdrop-blur-md `}
      >
        <SelectValue placeholder="Rating" />
      </SelectTrigger>
      <SelectContent>
        {ratings?.map((rating) => (
          <SelectItem key={rating} value={rating.toString()}>
            {rating}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
