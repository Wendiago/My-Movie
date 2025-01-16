const catchAsync = require("../utils/catchAsync");
const favoriteList = require("../models/favorite_list");
const ratingList = require("../models/rating_list");
const watchingList = require("../models/watching_list");
const Session = require("../models/accessModel");
const {
  BadRequestResponse,
  ConflictResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
} = require("../response/error");
const { OKSuccessResponse } = require("../response/success");

const favoriteListController = {
  addToList: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;

      const { idMovie } = req.body;

      // 2. Kiểm tra nếu không có idMovie
      if (!idMovie) {
        return new BadRequestResponse("Movie ID is required!");
      }

      // 3. Tìm danh sách yêu thích của người dùng
      let favorite_list = await favoriteList.findOne({ idUser: userId });

      // 4. Nếu danh sách chưa tồn tại, tạo mới
      if (!favorite_list) {
        const newList = new favoriteList({
          idUser: userId,
          favoriteList: [{ tmdb_id: idMovie }],
        });

        await newList.save();

        return res.status(200).json({
          success: true,
          message: "Added to favorite list successfully!",
        });
      }

      //Kiểm tra nếu phim đã có trong danh sách
      const movieExists = favorite_list.favoriteList.some(
        (item) => item.tmdb_id === idMovie
      );

      if (movieExists) {
        return new ConflictResponse("Movie already exists in favorite list!");
      }

      // 6. Thêm phim vào danh sách
      favorite_list.favoriteList.push({ tmdb_id: idMovie });
      await favorite_list.save();

      return res.status(200).json({
        success: true,
        message: "Added to favorite list successfully!",
      });
    } catch (error) {
      return new InternalServerErrorResponse(
        `Failed to add to favorite list: ${error.message}`
      );
    }
  }),

  removeFromFavorite: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { idMovie } = req.params;

      if (!idMovie) {
        return new BadRequestResponse("Movie ID is required!");
      }

      // 2. Tìm danh sách yêu thích của người dùng
      const favorite_list = await favoriteList.findOne({ idUser: userId });

      if (!favorite_list) {
        return new NotFoundResponse("Favorite list not found!");
      }

      // 3. Lọc bỏ phim cần xóa
      const updatedMovies = favorite_list.favoriteList.filter(
        (item) => item.tmdb_id !== Number(idMovie)
      );

      if (updatedMovies.length === favorite_list.favoriteList.length) {
        return new NotFoundResponse("Movie not found in the favorite list!");
      }

      // 4. Cập nhật danh sách yêu thích
      favorite_list.favoriteList = updatedMovies;
      await favorite_list.save();

      res.status(200).json({
        success: true,
        message: "Movie removed from favorite list successfully!",
      });
    } catch (error) {
      return new InternalServerErrorResponse(
        `Failed to remove from favorite list: ${error.message}`
      );
    }
  }),

  getAllFavoriteList: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;

      // 2. Validate and parse query parameters
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const offset = (page - 1) * limit;

      // 3. Fetch favorite list and total count
      const favoriteListData = await favoriteList
        .findOne({ idUser: userId })
        .populate({
          path: "favoriteList.tmdb_id",
          model: "movies",
          localField: "favoriteList.tmdb_id",
          foreignField: "tmdb_id",
          select:
            "tmdb_id backdrop_path genres overview poster_path release_date runtime title vote_average popularity",
        });

      if (!favoriteListData) {
        return res.status(200).json({
          success: true,
          message: "Favorite list is empty",
          data: null,
        });
      }

      //Fetch rating and watching lists
      const ratingListData = await ratingList.findOne({ idUser: userId });
      const watchingListData = await watchingList.findOne({ idUser: userId });

      const ratingMovieIds = ratingListData
        ? new Map(
            ratingListData.ratingList.map((item) => [item.tmdb_id, item.rating])
          )
        : new Map();

      const watchingMovieIds = watchingListData
        ? new Set(watchingListData.watchingList.map((item) => item.tmdb_id))
        : new Set();

      //Attach additional status to movies
      const moviesWithStatus = favoriteListData.favoriteList.map((movie) => ({
        ...movie.tmdb_id._doc,
        isWatching: watchingMovieIds.has(movie.tmdb_id.tmdb_id), // Kiểm tra trong danh sách đang xem
        rating: ratingMovieIds.get(movie.tmdb_id.tmdb_id) || null, // Lấy rating nếu có
      }));

      const paginatedMovies = moviesWithStatus.slice(offset, offset + limit);
      const totalMovies = favoriteListData.favoriteList.length;
      const totalPages = Math.ceil(totalMovies / limit);

      // 4. Respond with data
      res.status(200).json({
        success: true,
        message: "Get favorite list successfully!",
        data: paginatedMovies,
        totalMovies,
        page,
        totalPages,
      });
    } catch (error) {
      return new InternalServerErrorResponse(
        `Failed to get favorite list: ${error.message}`
      );
    }
  }),
};

module.exports = favoriteListController;
