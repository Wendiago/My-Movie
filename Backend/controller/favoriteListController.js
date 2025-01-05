const favoriteList = require("../models/favorite_list");
const ratingList = require("../models/rating_list");
const watchingList = require("../models/watching_list");
const AppError = require("../utils/appError");
const Session = require("../models/sessionModel");
const catchAsync = require("../utils/catchAsync");

const favoriteListController = {
    addToList: catchAsync(async (req, res, next) => {
        const { refreshToken } = req.cookies;
    
        //Kiểm tra refresh token
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
    
            if (!idMovie) {
                return res.status(400).json({
                    success: false,
                    message: "Movie ID is required!",
                });
            }

            let favorite_list = await favoriteList.findOne({ idUser: userId });
    
            //Nếu danh sách chưa tồn tại, tạo mới
            if (!favorite_list) {
                const newList = new favoriteList({
                    idUser: userId,
                    favoriteList: [{ tmdb_id: idMovie }],
                });
    
                await newList.save();
    
                return res.status(201).json({
                    success: true,
                    message: "Added to favorite list successfully!",
                });
            }
    
            //Kiểm tra nếu phim đã có trong danh sách
            const movieExists = favorite_list.favoriteList.some(
                (item) => item.tmdb_id === idMovie
            );
    
            if (movieExists) {
                return res.status(400).json({
                    success: false,
                    message: "Movie already exists in favorite list!",
                });
            }
    
            //Thêm phim vào danh sách
            favorite_list.favoriteList.push({ tmdb_id: idMovie });
            const updatedList = await favorite_list.save();
    
            return res.status(200).json({
                success: true,
                message: "Added to favorite list successfully!",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }),

    removeFromFavorite: catchAsync(async (req, res, next) => {
        const { refreshToken } = req.cookies;

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
    
            if (!idMovie) {
                return res.status(400).json({
                    success: false,
                    message: "Movie ID is required!",
                });
            }
    
            const favorite_list = await favoriteList.findOne({ idUser: userId });
    
            if (!favorite_list) {
                return res.status(404).json({
                    success: false,
                    message: "Favorite list not found!",
                });
            }
    
            const updatedMovies = favorite_list.favoriteList.filter(
                (item) => item.tmdb_id !== idMovie
            );
    
            if (updatedMovies.length === favorite_list.favoriteList.length) {
                return res.status(400).json({
                    success: false,
                    message: "Movie not found in the favorite list!",
                });
            }
    
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

    getAllFavoriteList: catchAsync(async (req, res, next) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return next(new AppError("You are not logged in.", 401));
        }

        try {
            const session = await Session.findOne({ token: refreshToken });
            if (!session) {
                return next(new AppError("You are not logged in.", 401));
            }

            const userId = session.userId;

            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;
            const offset = (page - 1) * limit;

            const favoriteListData = await favoriteList
                .findOne({ idUser: userId })
                .populate({
                    path: 'favoriteList.tmdb_id',
                    model: 'movies',
                    localField: 'favoriteList.tmdb_id',
                    foreignField: 'tmdb_id',
                    select: "tmdb_id backdrop_path genres overview poster_path release_date runtime title vote_average vote_count",
                });

            if (!favoriteListData || favoriteListData.favoriteList.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Favorite list is empty!",
                });
            }

            //Fetch rating and watching lists
            const ratingListData = await ratingList.findOne({ idUser: userId });
            const watchingListData = await watchingList.findOne({ idUser: userId });

            const ratingMovieIds = ratingListData
                ? new Map(ratingListData.ratingList.map((item) => [item.tmdb_id, item.rating]))
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

            res.status(200).json({
                success: true,
                message: "Get favorite list successfully!",
                data: paginatedMovies,
                totalMovies,
                page,
                totalPages,
            });
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    })

};

module.exports = favoriteListController;