'use client';

import { useCallback, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ReleaseDateFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [selectValue, setSelectValue] = useState(searchParams.get("release_date") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleYearSelect = useCallback(
    (year: string | null) => {
      router.push(pathName + "?" + createQueryString("release_date", year));
    },
    [createQueryString, pathName, router]
  );

  // Generate a list of years from 1970 to 2024
  const years = Array.from({ length: 2024 - 1970 + 1 }, (_, i) => (1970 + i).toString());

  return (
    <Select
      value={selectValue}
      onValueChange={(value) => {
        setSelectValue(value);
        handleYearSelect(value);
      }}
    >
      <SelectTrigger className="w-[120px] bg-background/80 text-foreground border-none pl-4 h-[40px] backdrop-blur-md">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
