const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movies");

const searchController = {
  searchMovieByName: catchAsync(async (req, res, next) => {
    try {
        const { genres, rating, release_year, page = 1, limit = 10 } = req.query;
        const keyWordSearch = req.query.search;

        console.log("keyWordSearch", release_year);
        const offset = (page - 1) * limit;

        const query = {};

        if (genres) {
            query.genres = { $elemMatch: { name: { $regex: new RegExp(genres, 'i') } } };
        }

        if (rating) {
            query.vote_average = { $gte: parseFloat(rating) };
        }

        if (release_year) {
            query.release_date = { $regex: `^${release_year}` };
        }

        if (keyWordSearch) {
            query.$or = [
                { title: { $regex: new RegExp(keyWordSearch, "i") } },
                { original_title: { $regex: new RegExp(keyWordSearch, "i") } }
            ];
        }

        // Tìm kiếm phim theo query và phân trang
        const data = await Movie.find(query)
            .skip(offset)
            .limit(parseInt(limit))
            .select("title original_title genres vote_average release_date poster_path overview tmdb_id")  
            .exec();

        // Đếm tổng số phim theo query
        const totalMovies = await Movie.countDocuments(query).exec();

        // Trả về kết quả
        return res.status(200).json({
            success: true,
            message: "Get Movies by Name successfully",
            data: data,
            totalMovies: totalMovies,
            page: parseInt(page),
            totalPage: Math.ceil(totalMovies / limit),
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        next(error);
    }
  }),

  searchMovieByCast: catchAsync(async (req, res, next) => {
    try {
        const { genres, rating, release_year, page = 1, limit = 10 } = req.query;
        const keyWordSearch = req.query.search;

        const offset = (page - 1) * limit;

        const query = {};

        if (genres) {
            query.genres = { $elemMatch: { name: { $regex: new RegExp(genres, 'i') } } };
        }

        if (rating) {
            query.vote_average = { $gte: parseFloat(rating) };
        }

        if (release_year) {
            query.release_date = { $regex: `^${release_year}` };
        }

        if (keyWordSearch) {
            query.$or = [
                { "credits.cast.name": { $regex: keyWordSearch, $options: "i" } },
                { "credits.cast.original_name": { $regex: keyWordSearch, $options: "i" } }
            ];
        }

        // Tìm kiếm phim theo query và phân trang
        const data = await Movie.find(query)
            .skip(offset)
            .limit(parseInt(limit))
            .select("title original_title genres vote_average release_date poster_path overview tmdb_id")
            .exec();

        // Đếm tổng số phim theo query
        const totalMovies = await Movie.countDocuments(query).exec();

        // Trả về kết quả
        return res.status(200).json({
            success: true,
            message: "Get Movies by Name successfully",
            data: data,
            totalMovies: totalMovies,
            page: parseInt(page),
            totalPage: Math.ceil(totalMovies / limit),
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        next(error);
    }
})
};

module.exports = searchController;
