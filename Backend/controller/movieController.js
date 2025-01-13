const catchAsync = require("../utils/catchAsync");
const CustomApi = require("../utils/customApi");
const AppError = require("../utils/appError");

const Genre = require("../models/movies_genres");
const Movie = require("../models/movies");
const MovieTrendingDay = require("../models/movies_trending_day");
const MovieTrendingWeek = require("../models/movies_trending_week");
const favoriteList = require("../models/favorite_list");
const watchingList = require("../models/watching_list");
const ratingList = require("../models/rating_list");

const movieController = {
  getDetailMovieById: catchAsync(async (req, res, next) => {
    try {
      const { idMovie } = req.params;

      const data = await Movie.findOne({ tmdb_id: idMovie }).select(
        "tmdb_id credits backdrop_path genres overview poster_path release_date runtime title vote_average vote_count"
      );

      if (!data) {
        return next(new AppError("Movie not found.", 404));
      }

      // Fetch additional data from external API
      const [reviews, videos] = await Promise.all([
        CustomApi(`movie/${idMovie}/reviews`),
        CustomApi(`movie/${idMovie}/videos`),
      ]);

      // Initialize response data
      const response = {
        success: true,
        message: "Detail movie fetched successfully",
        data: data,
        reviews: reviews.results,
        videos: videos.results,
      };

      // Check if user is logged in
      const clientId = req.headers["x-client-id"];
      const userId = clientId;

      if (userId) {
        const [favoriteListData, watchingListData, ratingListData] =
          await Promise.all([
            favoriteList.findOne({ idUser: userId }),
            watchingList.findOne({ idUser: userId }),
            ratingList.findOne({ idUser: userId }),
          ]);

        const isFavorite = favoriteListData?.favoriteList.some((movie) => {
          return movie.tmdb_id === parseInt(idMovie);
        });

        const isWatching = watchingListData?.watchingList.some((movie) => {
          return movie.tmdb_id === parseInt(idMovie);
        });

        const ratingEntry = ratingListData?.ratingList.find((movie) => {
          return movie.tmdb_id === parseInt(idMovie);
        });

        const rating = ratingEntry ? ratingEntry.rating : null;

        response.data = {
          ...data.toObject(),
          isFavorite: !!isFavorite,
          isWatching: !!isWatching,
          rating: rating,
        };
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching detail movie:", error);
      next(error);
    }
  }),

  getTrendingMoviesDay: catchAsync(async (req, res, next) => {
    try {
      const data = await MovieTrendingDay.find().limit(15);
      return res.status(200).json({
        success: true,
        message: "Trending movies day fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error);
    }
  }),

  getTrendingMoviesWeek: catchAsync(async (req, res, next) => {
    try {
      const data = await MovieTrendingWeek.find().limit(15);

      //const movies = await mapGenresToMovies(data.results);

      return res.status(200).json({
        success: true,
        message: "Trending movies week fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error);
    }
  }),

  getAllGenres: catchAsync(async (req, res, next) => {
    try {
      const genres = await Genre.find();
      //console.log("genres", genres);

      res.status(200).json({
        success: true,
        message: "Get All genres successfully",
        data: genres,
      });
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }),
};

module.exports = movieController;
