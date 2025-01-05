export type Movie = {
  _id: string;
  tmdb_id: number; // ID from TMDB
  adult: boolean; // Adult content flag
  backdrop_path?: string; // Backdrop image path
  belongs_to_collection?: {
    id?: number;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
  }; // Collection details
  budget?: number; // Production budget
  categories?: string[]; // Categories (e.g., popular, now_playing)
  genres?: {
    id?: number;
    name?: string;
  }[]; // Genre list
  homepage?: string; // Official website
  id?: number; // Movie ID
  imdb_id?: string; // IMDB ID
  origin_country?: string[]; // Original countries
  original_language?: string; // Original language
  original_title?: string; // Original title
  overview?: string; // Description
  popularity?: number; // Popularity score
  poster_path?: string; // Poster image path
  production_companies?: {
    id?: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
  }[]; // Production companies
  production_countries?: {
    iso_3166_1?: string;
    name?: string;
  }[]; // Production countries
  release_date?: string; // Release date
  revenue?: number; // Revenue
  runtime?: number; // Runtime in minutes
  spoken_languages?: {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }[]; // Spoken languages
  status?: string; // Movie status (e.g., Released, Post Production)
  tagline?: string; // Movie tagline
  title: string; // Movie title
  video?: boolean; // Trailer availability
  vote_average?: number; // Average rating
  vote_count?: number; // Total votes
  credits?: {
    id: number;
    cast: {
      adult: boolean;
      gender?: number; // 0: Unknown, 1: Female, 2: Male
      id: number;
      known_for_department?: string; // Example: Acting, Writing
      name: string;
      original_name: string;
      popularity?: number;
      profile_path?: string; // Profile image path
      cast_id?: number;
      character?: string; // Character played
      credit_id?: string;
      order?: number; // Order in credits
    }[];
    crew: {
      adult: boolean;
      gender?: number;
      id: number;
      known_for_department?: string; // Example: Directing, Production
      name: string;
      original_name: string;
      popularity?: number;
      profile_path?: string; // Profile image path
      credit_id?: string;
      department?: string; // Department, e.g., Production
      job?: string; // Job role, e.g., Director
    }[];
  };
};

export type Genre = {
  tmdb_id: number; // TMDB ID for the genre
  id: number; // Genre ID
  name: string; // Name of the genre
};

export type TrendingMovies = {
  tmdb_id: number; // ID from TMDB
  adult: boolean; // Indicates if the content is for adults
  backdrop_path?: string; // Backdrop image path
  categories?: string[]; // Categories (default is empty array)
  genre_ids?: number[]; // Array of genre IDs (default is empty array)
  id: number; // Movie ID
  media_type: string; // Media type (e.g., movie, TV show)
  original_language: string; // Original language
  original_title: string; // Original title
  overview?: string; // Description
  popularity: number; // Popularity score
  poster_path?: string; // Poster image path
  release_date?: string; // Release date
  title: string; // Movie title
  video: boolean; // Indicates if a video is available
  vote_average: number; // Average rating
  vote_count: number; // Total number of votes
};

export type People = {
  tmdb_id: number; // TMDB ID
  adult: boolean; // Indicates if the person is marked as an adult
  also_known_as?: string[]; // List of alternate names
  biography?: string; // Biography text
  birthday?: string; // Birthdate
  deathday?: string | null; // Death date (if applicable)
  gender: number; // Gender (0: Unknown, 1: Female, 2: Male)
  homepage?: string; // Homepage URL
  id: number; // Person's ID
  imdb_id?: string; // IMDB ID
  known_for_department?: string; // Known-for department (e.g., Acting, Directing)
  name: string; // Person's name
  place_of_birth?: string; // Place of birth
  popularity?: number; // Popularity score
  profile_path?: string; // Profile image path
  movie_credits?: {
    cast: {
      adult?: boolean; // Whether the cast member is marked as adult
      backdrop_path?: string | null; // Backdrop image path
      genre_ids?: number[]; // List of genre IDs
      id?: number; //cast id
      original_language?: string; // Original language of the movie
      original_title?: string; // Original title of the movie
      overview?: string; // Overview of the movie
      popularity?: number; // Popularity score of the movie
      poster_path?: string; // Poster image path
      release_date?: Date; // Release date of the movie
      title?: string; // Title of the movie
      video?: boolean; // Whether a video is available
      vote_average?: number; // Average vote score
      vote_count?: number; // Total vote count
      character?: string; // Character played by the person
      credit_id?: string; // Credit ID
      order?: number; // Order in the credits
    }[];
    crew?: object[]; // List of crew details (untyped here, can be expanded if needed)
    id?: number; // Credits ID
  };
};

export type User = {
  _id: string;
  name?: string;
  email: string;
  photo: string;
  isVerified: boolean;
};

export type FavoriteList = (Pick<
  Movie,
  | "_id"
  | "tmdb_id"
  | "title"
  | "backdrop_path"
  | "poster_path"
  | "overview"
  | "genres"
  | "release_date"
  | "runtime"
  | "vote_average"
  | "popularity"
> & {
  isWatching: boolean;
  rating: number;
})[];

export type GetFavoriteListResponse = {
  success: string;
  message: string;
  data: FavoriteList | null;
  page?: number;
  totalPages?: number;
  totalMovies?: number;
};

export type AddToFavoriteListResponse = {
  success: string;
  message: string;
};

export type RemoveFromFavoriteListResponse = {
  success: string;
  message: string;
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type GetAllGenresResponse = {
  success: boolean;
  message: string;
  data: Genre[];
};

export type GetTrendingMoviesResponse = {
  success: boolean;
  message: string;
  data: TrendingMovies[];
};

export type SearchMovieByNameResponse = {
  success: boolean;
  message: string;
  data: Movie[];
  totalMovies: number;
  page: number;
  totalPage: number;
};

export type SearchMovieByCastResponse = {
  success: boolean;
  message: string;
  data: People[];
  totalMovies: number;
  page: number;
  totalPage: number;
};

export type GetMovieDetailResponse = {
  success: boolean;
  message: string;
  data: Movie;
  reviews: any;
  videos: any;
  recommendations: any;
};

export type GetCastByIDResponse = {
  success: boolean;
  message: string;
  data: People;
};

export type MovieTrailer = {
  key: string;
  tmdb_id: Movie;
};

export type GetMovieTrailersResponse = {
  success: boolean;
  message: string;
  data: MovieTrailer[];
};
