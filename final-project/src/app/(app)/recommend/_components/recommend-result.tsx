"use client";

import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MovieCard from "./movie-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRecommendationBasedFavoriteList } from "@/api/recommend/recommend";
import { Movie } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import GenreFilter from "@/components/ui/genre-filter";
import RatingFilter from "@/components/ui/rating-filter";
import ReleaseDateFilter from "@/components/ui/release-date-filter";

export default function RecommendResults() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const genres = searchParams.get("genres") || "";
  const rating = searchParams.get("rating") || "";
  const release_year = searchParams.get("release_year") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { data, isLoading, isError, error } =
    useRecommendationBasedFavoriteList({
      genres: genres,
      rating: rating,
      release_year: release_year,
      page,
    });
  console.log("data", data);

  const handlePageChange = (newPage: string) => {
    router.push(pathName + "?" + createQueryString("page", newPage));
  };

  const getVisiblePages = (currentPage: number, total?: number) => {
    const visibleRange = 3; // Show 3 pages at a time
    const start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
    const end = Math.min(total, start + visibleRange - 1);

    // Adjust start if we're near the end of the page range
    const adjustedStart = Math.max(1, end - visibleRange + 1);
    return Array.from(
      { length: end - adjustedStart + 1 },
      (_, i) => adjustedStart + i
    );
  };

  const visiblePages = getVisiblePages(page, data?.totalPage);

  if (isError) {
    return (
      <div className="text-center text-destructive py-4">
        {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="container h-full">
      {isLoading ? (
        <div className="flex flex-wrap gap-4 justify-center mt-16">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className="sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] lg:h-[400px] md:h-[350px] rounded-md bg-gray-200"
            />
          ))}
        </div>
      ) : data?.data == null || data?.data?.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          No results found for Recommendations.
        </div>
      ) : (
        <>
          <div className="flex justify-between my-8 pl-2 pr-2 gap-16">
            <div className="font-bold text-2xl">
              <span className="text-primary">Recommendations</span>
            </div>
            <div className="flex flex-row gap-1">
              <GenreFilter />
              <RatingFilter />
              <ReleaseDateFilter />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {data?.data?.map((movie: Movie) => (
              <MovieCard key={movie.tmdb_id} {...movie} />
            ))}
          </div>

          <Pagination className="mt-6 mb-6">
            <PaginationContent className="rounded-md">
              {page !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        page > 1
                          ? (page - 1).toString()
                          : data?.totalPage.toString()
                      )
                    }
                  />
                </PaginationItem>
              )}
              {visiblePages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageNumber.toString())}
                    isActive={pageNumber === page}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {visiblePages[visiblePages.length - 1] < data?.totalPage && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page !== data?.totalPage && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        page < data?.totalPage ? (page + 1).toString() : "1"
                      )
                    }
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
