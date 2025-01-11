const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const watchingList = require("../models/watching_list");
const Session = require("../models/accessModel");
const Movie = require("../models/movies");
const favoriteList = require("../models/favorite_list");
const ratingList = require("../models/rating_list");

const ratingListController = {
  addToList: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { idMovie, rating } = req.body;

      if (!idMovie) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required!",
        });
      }

      if (!rating) {
        return res.status(400).json({
          success: false,
          message: "Rating is required!",
        });
      }

      //Kiểm tra idMovie có tồn tại trong cơ sở dữ liệu phim
      const movieExists = await Movie.findOne({ tmdb_id: idMovie });
      if (!movieExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid Movie ID!",
        });
      }

      let rating_list = await ratingList.findOne({ idUser: userId });

      if (!rating_list) {
        const newList = new ratingList({
          idUser: userId,
          ratingList: [{ tmdb_id: idMovie, rating }],
        });

        await newList.save();

        return res.status(201).json({
          success: true,
          message: "Added to rating list successfully!",
        });
      }

      // Kiểm tra nếu phim đã có trong danh sách
      const existingMovie = rating_list.ratingList.find(
        (item) => item.tmdb_id === idMovie
      );

      if (existingMovie) {
        // Cập nhật điểm nếu phim đã có
        existingMovie.rating = rating;
        await rating_list.save();

        return res.status(200).json({
          success: true,
          message: "Updated movie rating successfully!",
        });
      }

      rating_list.ratingList.push({ tmdb_id: idMovie, rating });
      await rating_list.save();

      return res.status(200).json({
        success: true,
        message: "Added to rating list successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }),

  removeFromList: catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { idMovie } = req.params;

    if (!idMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required!",
      });
    }

    const rating_list = await ratingList.findOne({ idUser: userId });

    if (!rating_list) {
      return res.status(404).json({
        success: false,
        message: "Rating list not found!",
      });
    }

    const updatedMovies = rating_list.ratingList.filter(
      (item) => item.tmdb_id !== Number(idMovie)
    );

    if (updatedMovies.length === rating_list.ratingList.length) {
      return res.status(400).json({
        success: false,
        message: "Movie not found in the rating list!",
      });
    }

    rating_list.ratingList = updatedMovies;
    await rating_list.save();

    res.status(200).json({
      success: true,
      message: "Movie removed from rating list successfully!",
    });
  }),

  getAllRatingList: catchAsync(async (req, res, next) => {
    
    const userId = req.user.id;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const ratingListData = await ratingList
      .findOne({ idUser: userId })
      .populate({
        path: "ratingList.tmdb_id",
        model: "movies",
        localField: "ratingList.tmdb_id",
        foreignField: "tmdb_id",
        select:
          "tmdb_id title overview poster_path genres release_date runtime vote_average vote_count original_title",
      });

    if (!ratingListData || ratingListData.ratingList.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Rating list is empty!",
        data: null,
      });
    }

    const favoriteListData = await favoriteList.findOne({ idUser: userId });
    const favoriteMovieIds = favoriteListData
      ? new Set(favoriteListData.favoriteList.map((item) => item.tmdb_id))
      : new Set();

    const watchingListData = await watchingList.findOne({ idUser: userId });
    const watchingMovieIds = watchingListData
      ? new Set(watchingListData.watchingList.map((item) => item.tmdb_id))
      : new Set();

    //Gắn thông tin `isFavorite` và `isWatching`
    const moviesWithStatus = ratingListData.ratingList.map((movie) => ({
      ...movie.tmdb_id._doc, // Lấy thông tin chi tiết của phim
      rating: movie.rating, // Điểm đánh giá
      isFavorite: favoriteMovieIds.has(movie.tmdb_id.tmdb_id), // Kiểm tra xem phim có trong danh sách yêu thích không
      isWatching: watchingMovieIds.has(movie.tmdb_id.tmdb_id), // Kiểm tra xem phim có trong danh sách đang xem không
    }));

    const paginatedMovies = moviesWithStatus.slice(offset, offset + limit);
    const totalMovies = moviesWithStatus.length;
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      success: true,
      message: "Get rating list successfully!",
      data: paginatedMovies,
      totalMovies,
      page,
      totalPages,
    });
  }),
};

module.exports = ratingListController;
