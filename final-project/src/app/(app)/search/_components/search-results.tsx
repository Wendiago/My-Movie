'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/lib/routes';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const SearchResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            search
          )}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [search, page]);

  const handlePageChange = (newPage: string) => {
    const query = new URLSearchParams(searchParams);
    query.set('page', newPage);
    router.push(`?${query.toString()}`);
  };

  const getVisiblePages = (currentPage: number, total: number) => {
    const visibleRange = 3; // Show 3 pages at a time
    const start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
    const end = Math.min(total, start + visibleRange - 1);

    // Adjust start if we're near the end of the page range
    const adjustedStart = Math.max(1, end - visibleRange + 1);
    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
  };

  const visiblePages = getVisiblePages(page, totalPages);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 max-w-[1000px]">
      {results.length === 0 ? (
        <div className="text-center py-4">No results found for &quot;{search}&quot;.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {results.map((movie) => (
              <Card
                onClick={() => {
                  router.push(paths.details.getHref(movie.id));
                }}
                key={movie.id}
                className="flex flex-col items-center max-w-full w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] hover:shadow-md p-4"
              >
                {movie.backdrop_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-md object-cover"
                  />
                ) : (
                  <div className="w-full aspect-w-16 aspect-h-9 bg-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="mt-2 text-center text-lg font-medium">{movie.title}</h3>
                <p className="text-center text-sm text-gray-500">
                  {movie.release_date || 'N/A'}
                </p>
              </Card>
            ))}
          </div>

          <Pagination className="mt-6">
            <PaginationContent>
              {page !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(page > 1 ? (page - 1).toString() : totalPages.toString())}
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
              {visiblePages[visiblePages.length - 1] < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page !== totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(page < totalPages ? (page + 1).toString() : "1")}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default SearchResults;
