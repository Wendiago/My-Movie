'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGenres } from "@/api/movie/movie";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";

export default function GenreFilter() {
  const router = useRouter();
  const { data: genres } = useGenres();

  const handleGenreSelect = async (genreId: number | null) => {
    router.push(paths.genre.getHref(genreId.toString()));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="font-bold text-primary">Thể loại</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Chọn Thể loại</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {genres?.data?.map((genre) => (
          <DropdownMenuItem
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)}
          >
            {genre.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
