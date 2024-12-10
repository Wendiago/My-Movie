export type SubCarouselMovie = {
  name: string;
  imgURL: string;
  status?: string;
  newEpisode?: string;
};

export type Movie = {
  id: string;
  title: string;
  backdrop_path?: string;
  release_date?: string;
}