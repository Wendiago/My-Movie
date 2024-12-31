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
import { Movie } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

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


  return (
    <div className="container min-h-screen mx-auto px-4 max-w-screen-lg">
      
            Search result for:{" "}
            
    </div>
  );
}
