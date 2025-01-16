const catchAsync = require("../utils/catchAsync");
const watchingList = require("../models/watching_list");
const ratingList = require("../models/rating_list");
const Session = require("../models/accessModel");
const Movie = require("../models/movies");
const favoriteList = require("../models/favorite_list");
const {
  BadRequestResponse,
  NotFoundResponse,
  ConflictResponse,
  InternalServerErrorResponse,
} = require("../response/error");

const watchingListController = {
  addToList: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { idMovie } = req.body;

      if (!idMovie) {
        return new BadRequestResponse("Movie ID is required!");
      }

      const movieExists = await Movie.findOne({ tmdb_id: idMovie });

      if (!movieExists) {
        return new NotFoundResponse("Movie ID not found");
      }

      let watching_list = await watchingList.findOne({ idUser: userId });

      if (!watching_list) {
        const newList = new watchingList({
          idUser: userId,
          watchingList: [{ tmdb_id: idMovie }],
        });

        await newList.save();

        return res.status(201).json({
          success: true,
          message: "Added to watching list successfully!",
        });
      }

      const movieExistsInList = watching_list.watchingList.some(
        (item) => item.tmdb_id === idMovie
      );

      if (movieExistsInList) {
        return new ConflictResponse("Movie already exists in watching list!");
      }

      watching_list.watchingList.push({ tmdb_id: idMovie });
      await watching_list.save();

      return res.status(200).json({
        success: true,
        message: "Added to watching list successfully!",
      });
    } catch (error) {
      return new InternalServerErrorResponse(
        `Fail to add to watchlist: ${error.message}`
      );
    }
  }),

  removeFromList: catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { idMovie } = req.params;

    if (!idMovie) {
      return new BadRequestResponse("Movie ID is required!");
    }

    const watching_list = await watchingList.findOne({ idUser: userId });

    if (!watching_list) {
      return new NotFoundResponse("Watching list not found!");
    }

    const updatedMovies = watching_list.watchingList.filter(
      (item) => item.tmdb_id !== Number(idMovie)
    );

    if (updatedMovies.length === watching_list.watchingList.length) {
      return new NotFoundResponse("Movie not found in the watching list!");
    }

    watching_list.watchingList = updatedMovies;
    await watching_list.save();

    res.status(200).json({
      success: true,
      message: "Movie removed from watching list successfully!",
    });
  }),

  getAllWatchingList: catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    // Phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Lấy danh sách `watchingList`
    const watchingListData = await watchingList
      .findOne({ idUser: userId })
      .populate({
        path: "watchingList.tmdb_id",
        model: "movies",
        localField: "watchingList.tmdb_id",
        foreignField: "tmdb_id",
        select:
          "tmdb_id title overview poster_path genres release_date runtime vote_average vote_count original_title",
      });

    if (!watchingListData || watchingListData.watchingList.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Watching list is empty!",
        data: null,
      });
    }

    // Lấy danh sách `favoriteList`
    const favoriteListData = await favoriteList.findOne({ idUser: userId });

    const favoriteMovieIds = favoriteListData
      ? favoriteListData.favoriteList.map((item) => item.tmdb_id)
      : [];

    const ratingListData = await ratingList.findOne({ idUser: userId });
    const ratingMovieIds = ratingListData
      ? new Map(
          ratingListData.ratingList.map((item) => [item.tmdb_id, item.rating])
        )
      : new Map();

    const moviesWithFavoriteStatus = watchingListData.watchingList.map(
      (movie) => ({
        ...movie.tmdb_id._doc, // Lấy thông tin chi tiết của phim
        isFavorite: favoriteMovieIds.includes(movie.tmdb_id.tmdb_id),
        rating: ratingMovieIds.get(movie.tmdb_id.tmdb_id) || null,
      })
    );

    const totalMovies = watchingListData.watchingList.length;
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      success: true,
      message: "Get watching list successfully!",
      data: moviesWithFavoriteStatus.slice(offset, offset + limit),
      totalMovies,
      page,
      totalPages,
    });
  }),
};

module.exports = watchingListController;
