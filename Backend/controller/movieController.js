const catchAsync = require("../utils/catchAsync");
const Genre = require("../models/movies_genres");
const Movie = require("../models/movies");
const MovieTrendingDay = require("../models/movies_trending_day");
const MovieTrendingWeek = require("../models/movies_trending_week");
const CustomApi = require("../utils/customApi");

const movieController = {
  getDetailMovieById: catchAsync(async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        const data = await Movie.findOne({ tmdb_id: idMovie})
                .select("tmdb_id credits backdrop_path genres overview poster_path release_date runtime title vote_average vote_count");

        const reviews = await CustomApi(`movie/${idMovie}/reviews`);
        const videos = await CustomApi(`movie/${idMovie}/videos`);
        const recommendations = await CustomApi(`movie/${idMovie}/recommendations`);
        return res.status(200).json({
            success: true,
            message: "Detail movie fetched successfully",
            data: data,
            reviews: reviews.results,
            videos: videos.results,
            recommendations: recommendations.results
        });
    } catch (error) {
        console.error("Error fetching detail movie:", error);
        next(error);
    }
}),

  getTrendingMoviesDay: catchAsync(async (req, res, next) => {
    try {
      const data = await MovieTrendingDay.find().limit(20);
      return res.status(200).json({
          success: true,
          message: "Trending movies day fetched successfully",
          data: data
      });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error);
    }
  }),

  getTrendingMoviesWeek: catchAsync(async (req, res, next) => {
    try {
      const data = await MovieTrendingWeek.find().limit(20);

      const movies = await mapGenresToMovies(data.results);

      return res.status(200).json({
        success: true,
        message: "Trending movies week fetched successfully",
        data: movies,
      });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error);
    }
  }),

  getAllGenres: catchAsync(async (req, res, next) => {
    try {
        const genres = await Genre.find();
        console.log("genres", genres);

        res.status(200).json({
          success: true,
          message: "Get All genres successfully",
          data: genres
        });
      
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
  }),
};

module.exports = movieController;
