const favoriteList = require("../models/favorite_list");
const AppError = require("../utils/appError");
const Session = require("../models/sessionModel");
const catchAsync = require("../utils/catchAsync");

const favoriteListController = {
  addToList: catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    // 1. Kiểm tra refresh token
    if (!refreshToken) {
      return next(new AppError("You are not logged in.", 401));
    }

    try {
      const session = await Session.findOne({ token: refreshToken });

      if (!session) {
        return next(new AppError("You are not logged in.", 401));
      }

      const userId = session.userId;

      const { idMovie } = req.body;

      // 2. Kiểm tra nếu không có idMovie
      if (!idMovie) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required!",
        });
      }

      // 3. Tìm danh sách yêu thích của người dùng
      let favorite_list = await favoriteList.findOne({ idUser: userId });

      // 4. Nếu danh sách chưa tồn tại, tạo mới
      if (!favorite_list) {
        const newList = new favoriteList({
          idUser: userId,
          favoriteList: [{ idMovie }],
        });

        await newList.save();

        return res.status(200).json({
          success: true,
          message: "Added to favorite list successfully!",
        });
      }

      // 5. Kiểm tra nếu phim đã có trong danh sách
      const movieExists = favorite_list.favoriteList.some(
        (item) => item.idMovie.toString() === idMovie
      );

      if (movieExists) {
        return res.status(400).json({
          success: false,
          message: "Movie already exists in favorite list!",
        });
      }

      // 6. Thêm phim vào danh sách
      favorite_list.favoriteList.push({ idMovie });
      const updatedList = await favorite_list.save();

      return res.status(200).json({
        success: true,
        message: "Added to favorite list successfully!",
        data: updatedList,
      });
    } catch (error) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }),

  removeFromFavorite: catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    // 1. Kiểm tra refresh token
    if (!refreshToken) {
      return next(new AppError("You are not logged in.", 401));
    }

    try {
      // Lấy thông tin phiên từ token
      const session = await Session.findOne({ token: refreshToken });

      if (!session) {
        return next(new AppError("You are not logged in.", 401));
      }

      const userId = session.userId;
      const { idMovie } = req.params; // Lấy idMovie từ request body

      if (!idMovie) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required!",
        });
      }

      // 2. Tìm danh sách yêu thích của người dùng
      const favorite_list = await favoriteList.findOne({ idUser: userId });

      if (!favorite_list) {
        return res.status(404).json({
          success: false,
          message: "Favorite list not found!",
        });
      }

      // 3. Lọc bỏ phim cần xóa
      const updatedMovies = favorite_list.favoriteList.filter(
        (item) => item.idMovie.toString() !== idMovie
      );

      if (updatedMovies.length === favorite_list.favoriteList.length) {
        return res.status(400).json({
          success: false,
          message: "Movie not found in the favorite list!",
        });
      }

      // 4. Cập nhật danh sách yêu thích
      favorite_list.favoriteList = updatedMovies;
      const updatedList = await favorite_list.save();

      res.status(200).json({
        success: true,
        message: "Movie removed from favorite list successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }),

  // getAllFavoriteList: catchAsync(async (req, res, next) => {
  //     const { refreshToken } = req.cookies;

  //     // 1. Kiểm tra refresh token
  //     if (!refreshToken) {
  //         return next(new AppError("You are not logged in.", 401));
  //     }

  //     try {
  //         // Lấy thông tin phiên từ token
  //         const session = await Session.findOne({ token: refreshToken });

  //         if (!session) {
  //             return next(new AppError("You are not logged in.", 401));
  //         }

  //         const userId = session.userId;

  //         const {page = 1, limit = 10} = req.query;
  //         const offset = (page - 1) * limit;

  //         // 2. Tìm danh sách yêu thích của người dùng
  //         const favorite_list = await favoriteList
  //             .findOne({ idUser: userId })
  //             .populate('favoriteList.idMovie')
  //             .skip(offset)
  //             .limit(limit);

  //         if (!favorite_list) {
  //             return res.status(404).json({
  //                 success: false,
  //                 message: "Favorite list not found!",
  //             });
  //         }

  //         const totalMovies = favorite_list.favoriteList.length;
  //         res.status(200).json({
  //             success: true,
  //             message: "Get favorite list successfully!",
  //             data: favorite_list,
  //             totalMovies: totalMovies,
  //             page: parseInt(page),
  //             totalPage: Math.ceil(favorite_list.favoriteList.length / limit),
  //         });
  //     } catch (error) {
  //         res.status(500).json({ message: error.message });
  //     }
  // })

  getAllFavoriteList: catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    // 1. Validate refresh token
    if (!refreshToken) {
      return next(new AppError("You are not logged in.", 401));
    }

    try {
      const session = await Session.findOne({ token: refreshToken });
      if (!session) {
        return next(new AppError("You are not logged in.", 401));
      }

      const userId = session.userId;

      // 2. Validate and parse query parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;

      // 3. Fetch favorite list and total count
      const favoriteListData = await favoriteList
        .findOne({ idUser: userId })
        .populate({
          path: "favoriteList.idMovie",
          options: { skip: offset, limit: limit },
          select:
            "_id tmdb_id backdrop_path overview poster_path release_date runtime title vote_average popularity",
        });

      if (!favoriteListData) {
        return res.status(200).json({
          success: true,
          message: "Favorite list is empty",
          data: null,
        });
      }

      const totalMovies = favoriteListData.favoriteList.length;
      const totalPages = Math.ceil(totalMovies / limit);

      // 4. Respond with data
      res.status(200).json({
        success: true,
        message: "Get favorite list successfully!",
        data: favoriteListData,
        totalMovies,
        page,
        totalPages,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  }),
};

module.exports = favoriteListController;
