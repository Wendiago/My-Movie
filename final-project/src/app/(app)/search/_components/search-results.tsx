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
import { useSearchMovies } from "@/api/search/search";
import { Movie } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import GenreFilter from "@/components/ui/genre-filter";

export default function SearchResults() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword") || "";
  const type = searchParams.get("type") || "name";
  const genres = searchParams.get("genres") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { data, isLoading, isError, error } = useSearchMovies({
    query: search,
    searchType: type,
    genres: genres,
    page,
  });
  console.log("data", data);

  const handlePageChange = (newPage: string) => {
    router.push(pathName + "?" + createQueryString("page", newPage));
    // const query = new URLSearchParams(searchParams);
    // query.set("page", newPage);
    // router.push(`?${query.toString()}`);
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
      <div className="text-center text-red-500 py-4">
        {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto px-4 max-w-screen-lg">
      {isLoading ? (
        <div className="flex flex-wrap gap-4 justify-center mt-16">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className="sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] lg:h-[400px] md:h-[350px] rounded-md bg-gray-200"
            />
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className="text-center py-4">
          No results found for &quot;{search}&quot;.
        </div>
      ) : (
        <>
          <div className="flex flex-row my-8 gap-8">
            <div className="text-background font-bold text-2xl">
              Search result for:{" "}
              <span className="text-primary">&quot;{search}&quot;</span>
            </div>
            <GenreFilter />
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {data?.data?.map((movie: Movie) => (
              <MovieCard key={movie.tmdb_id} {...movie} />
            ))}
          </div>

          <Pagination className="mt-6 mb-6">
            <PaginationContent className="bg-foreground rounded-md">
              {page !== 1 && (
                <PaginationItem className="bg-foreground text-background">
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
                <PaginationItem
                  key={pageNumber}
                  className="bg-foreground text-background"
                >
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageNumber.toString())}
                    isActive={pageNumber === page}
                    className="bg-foreground text-background"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {visiblePages[visiblePages.length - 1] < data?.totalPage && (
                <PaginationItem className="bg-foreground text-background">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page !== data?.totalPage && (
                <PaginationItem className="bg-foreground text-background">
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
