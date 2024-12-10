import { Card } from "@/components/ui/card";
import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Movie } from "@/types/api";

export default function MovieCard(movie: Movie) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(paths.details.getHref(movie.id));
      }}
      key={movie.id}
      className="cursor-pointer flex flex-col items-center max-w-full w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] hover:shadow-md p-4"
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
  );
}
