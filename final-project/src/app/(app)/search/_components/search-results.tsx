"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useSearchMovies } from "@/api/movie/movie";
import { Movie } from "@/types/api";

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading, isError, error } = useSearchMovies({
    query: search,
    page,
  });
  console.log("data", data);

  const handlePageChange = (newPage: string) => {
    const query = new URLSearchParams(searchParams);
    query.set("page", newPage);
    router.push(`?${query.toString()}`);
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

  const visiblePages = getVisiblePages(page, data?.total_pages);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        {error.message || "Something went wrong"}
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div className="text-center text-red-500 py-4">
        Something wrong with your movies
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-[1000px]">
      {data?.length === 0 ? (
        <div className="text-center py-4">
          No results found for &quot;{search}&quot;.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {data?.data?.map((movie: Movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>

          <Pagination className="mt-6 mb-6">
            <PaginationContent className="bg-foreground rounded-md">
              {page !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        page > 1
                          ? (page - 1).toString()
                          : data?.total_pages.toString()
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
              {visiblePages[visiblePages.length - 1] < data?.total_pages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page !== data?.total_pages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        page < data?.total_pages ? (page + 1).toString() : "1"
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
