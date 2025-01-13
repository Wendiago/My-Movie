import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/api";
import CustomImage from "@/components/ui/custom-image";

export default function MovieCard(movie: Movie) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(paths.details.getHref(movie.tmdb_id.toString()));
      }}
      key={movie.tmdb_id}
      className="group cursor-pointer flex flex-col items-center max-w-full w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] hover:shadow-md p-0 border-none rounded-sm"
    >
      <CustomImage
        src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w300${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={300}
        className="w-full lg:h-[400px] md:h-[350px] object-cover rounded-sm"
        placeholderSrc={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w300${movie.poster_path}`}
      ></CustomImage>
      <div className="flex flex-col justify-start items-center py-2">
        <h3 className="text-lg font-medium text-center group-hover:text-primary">
          {movie.title}
        </h3>
        <p className="text-sm text-textGrey brightness-150">
          {movie.release_date || "N/A"}
        </p>
      </div>
    </div>
  );
}
