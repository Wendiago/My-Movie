const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movies");
const FavoriteList = require("../models/favorite_list");
const AppError = require("../utils/appError");
const Session = require("../models/sessionModel");
const MovieUpcoming = require("../models/movies_upcoming");
const LatestTrailerList = require("../models/latest_trailer_list");
const customApi = require("../utils/customApi");

const recommendController = {
    getRecommendationBasedFavoriteList: catchAsync(async (req, res, next) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return next(new AppError("You are not logged in.", 401));
        }

        try {
            const session = await Session.findOne({ token: refreshToken });

            if (!session) {
                return next(new AppError("You are not logged in.", 401));
            }

            const { genres, rating, release_date, page = 1, limit = 10 } = req.query;

            const offset = (page - 1) * limit;

            const userId = session.userId;
            const favorite_list = await FavoriteList.findOne({ idUser: userId });

            const query = {};

            if (genres) {
                query['genres.name'] = { $regex: new RegExp(genres, 'i') }; // lọc theo tên thể loại
            }

            if (rating) {
                query.vote_average = { $gte: parseFloat(rating) }; // lọc theo rating
            }

            if (release_date) {
                query.release_date = { $gte: release_date }; // lọc theo ngày phát hành (ví dụ, >= ngày được cung cấp)
            }

            if (!favorite_list) {
                const movies = await Movie.find(query).skip(offset).limit(parseInt(limit));
                return res.status(200).json({
                    success: true,
                    message: "No favorite list found!, so Get All Movies successfully",
                    data: movies,
                });
            }

            // Lấy danh sách id của các phim yêu thích
            const favoriteIdMovies = favorite_list.favoriteList.map((movie) => movie.idMovie);

            if (favoriteIdMovies.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "Your favorite list is empty.",
                    data: [],
                });
            }
            // Lấy thông tin các phim yêu thích
            const favoriteMovies = await Movie.find({ _id: { $in: favoriteIdMovies } });
            
            // Lấy danh sách thể loại của các phim yêu thích
            const favoriteGenres = favoriteMovies.reduce((genres, movie) => {
                movie.genres.forEach((genre) => {
                    if (!genres.some((g) => g.id === genre.id)) {
                        genres.push(genre);
                    }
                });
                return genres;
            }, []);

            // Tìm các bộ phim có ít nhất 2 thể loại trùng với các phim yêu thích và áp dụng các filter
            const recommendedMovies = await Movie.find({
                _id: { $nin: favoriteIdMovies }, // Loại bỏ phim trong danh sách yêu thích
                'genres.id': { $in: favoriteGenres.map((genre) => genre.id) },
                $expr: {
                    $gte: [
                        {
                            $size: {
                                $filter: {
                                    input: '$genres',
                                    as: 'genre',
                                    cond: { $in: ['$$genre.id', favoriteGenres.map((genre) => genre.id)] }
                                }
                            }
                        },
                        3
                    ]
                },
                ...query // Thêm các điều kiện filter vào query
            })
            .skip(offset)
            .limit(parseInt(limit));

            // Tính tổng số bộ phim để phân trang
            const totalMovies = await Movie.countDocuments({
                _id: { $nin: favoriteIdMovies }, // Loại bỏ phim trong danh sách yêu thích
                'genres.id': { $in: favoriteGenres.map((genre) => genre.id) },
                $expr: {
                    $gte: [
                        {
                            $size: {
                                $filter: {
                                    input: '$genres',
                                    as: 'genre',
                                    cond: { $in: ['$$genre.id', favoriteGenres.map((genre) => genre.id)] }
                                }
                            }
                        },
                        3
                    ]
                },
                ...query // Thêm các điều kiện filter vào query
            });

            return res.status(200).json({
                success: true,
                data: recommendedMovies,
                totalMovies: totalMovies,
                page: parseInt(page),
                totalPage: Math.ceil(totalMovies / limit),
            });
        } catch (error) {
            // Xử lý lỗi
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }),
    setLatestTrailerList: catchAsync(async (req, res, next) => {
        try {
            const latestTrailerList = await MovieUpcoming.find({
                release_date: { $exists: true, $ne: null },
            })
                .sort({ release_date: -1 })
                .limit(100);
    
                const latestTrailerListIdTMDB = latestTrailerList
                .map((movie) => movie.tmdb_id)
                .filter((tmdb_id) => tmdb_id !== 1367622);
    
            console.log("latestTrailerListIdTMDB", latestTrailerListIdTMDB);

            latestTrailerListIdTMDB.forEach(async (movieId) => {
                const data = await customApi(`movie/${movieId}/videos`);
                if(data.results.length === 0) {
                    console.log("No trailer found for movie", movieId);	
                }
                else {
                    const newLatestTrailerList = new LatestTrailerList({
                        tmdb_id: movieId,
                        key: data.results[0].key,
                    })
                    await newLatestTrailerList.save();
                }
            })
    
            return res.status(200).json({
                success: true,
                message: "Get latest trailer list successfully!",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }),
    getLatestTrailerList: catchAsync(async (req, res, next) => {
        try {
            const latestTrailerList = await LatestTrailerList.find()
                .populate({
                    path: 'tmdb_id',
                    model: 'movies', 
                    localField: 'tmdb_id', 
                    foreignField: 'tmdb_id', 
                    select: 'title release_date genres backdrop_path original_title',
                });
    
                const List = latestTrailerList
                .filter((movie) => movie.tmdb_id && movie.tmdb_id.backdrop_path !== null)
                .slice(0, 20);

            return res.status(200).json({
                success: true,
                message: "Get latest trailer list successfully!",
                data: List,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }),
};

module.exports = recommendController;
