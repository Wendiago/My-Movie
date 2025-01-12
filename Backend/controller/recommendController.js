const catchAsync = require("../utils/catchAsync");

const FavoriteList = require("../models/favorite_list");
const Movie = require("../models/movies");

const recommendController = {
  getRecommendationBasedFavoriteList: catchAsync(async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { genres, rating, release_year, page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const query = {};

      if (genres) {
        query["genres.name"] = { $regex: new RegExp(genres, "i") }; // lọc theo tên thể loại
      }

      if (rating) {
        query.vote_average = { $gte: parseFloat(rating) }; // lọc theo rating
      }

      if (release_year) {
        query.release_date = { $regex: `^${release_year}` };
      }

      const favorite_list = await FavoriteList.findOne({ idUser: userId });

      if (!favorite_list) {
        const movies = await Movie.find(query)
          .skip(offset)
          .limit(parseInt(limit))
          .select(
            "tmdb_id title original_title poster_path genres vote_average release_date"
          );

        return res.status(200).json({
          success: true,
          message: "Favorite List is not found, so Get All Movies successfully",
          data: movies,
          page: page,
          totalPage: 10,
        });
      }

      // Lấy danh sách id của các phim yêu thích
      const favoriteIdMovies = favorite_list.favoriteList.map(
        (movie) => movie.tmdb_id
      );

      if (favoriteIdMovies.length === 0) {
        const movies = await Movie.find(query)
          .skip(offset)
          .limit(parseInt(limit))
          .select(
            "tmdb_id title original_title poster_path genres vote_average release_date"
          );

        return res.status(200).json({
          success: true,
          message:
            "Your favorite list is empty, so Get All Movies successfully",
          data: movies,
          page: page,
          totalPage: 10,
        });
      }
      // Lấy thông tin các phim yêu thích
      const favoriteMovies = await Movie.find({
        tmdb_id: { $in: favoriteIdMovies },
      });

      // Lấy danh sách thể loại của các phim yêu thích
      const favoriteGenres = favoriteMovies.reduce((genres, movie) => {
        movie.genres.forEach((genre) => {
          if (!genres.some((g) => g.id === genre.id)) {
            genres.push(genre);
          }
        });
        return genres;
      }, []);

      let count = 0;

      if (favoriteGenres.length < 5) {
        count = favoriteGenres.length;
      } else {
        count = 5;
      }

      // Tìm các bộ phim có ít nhất 3 thể loại trùng với các phim yêu thích và áp dụng các filter
      const recommendedMovies = await Movie.find({
        tmdb_id: { $nin: favoriteIdMovies }, // Loại bỏ phim trong danh sách yêu thích
        "genres.id": { $in: favoriteGenres.map((genre) => genre.id) },
        $expr: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: "$genres",
                  as: "genre",
                  cond: {
                    $in: [
                      "$$genre.id",
                      favoriteGenres.map((genre) => genre.id),
                    ],
                  },
                },
              },
            },
            count,
          ],
        },
        ...query, // Thêm các điều kiện filter vào query
      })
        .skip(offset)
        .limit(parseInt(limit))
        .select(
          "tmdb_id title original_title poster_path genres vote_average release_date"
        );

      // Tính tổng số bộ phim để phân trang
      const totalMovies = await Movie.countDocuments({
        tmdb_id: { $nin: favoriteIdMovies }, // Loại bỏ phim trong danh sách yêu thích
        "genres.id": { $in: favoriteGenres.map((genre) => genre.id) },
        $expr: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: "$genres",
                  as: "genre",
                  cond: {
                    $in: [
                      "$$genre.id",
                      favoriteGenres.map((genre) => genre.id),
                    ],
                  },
                },
              },
            },
            count,
          ],
        },
        ...query, // Thêm các điều kiện filter vào query
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

  getRecommendationBasedSelectedMovie: catchAsync(async (req, res, next) => {
    try {
      const { idMovie } = req.params;
      const movie = await Movie.findOne({ tmdb_id: idMovie });
      if (!movie) {
        return [];
      }

      // Lấy danh sách thể loại của phim
      const genres = movie.genres.map((genre) => genre.id);

      let count = 0;

      if (genres.length < 3) {
        count = genres.length;
      } else {
        count = 3;
      }
      const recommendedMovies = await Movie.aggregate([
        { $match: { _id: { $ne: movie._id } } }, // Loại trừ phim được chọn
        {
          $addFields: {
            commonCount: {
              $size: { $setIntersection: ["$genres.id", genres] },
            },
          },
        },
        { $match: { commonCount: { $gte: count } } }, // Ít nhất count thể loại trùng
        {
          $project: {
            title: 1, // lấy trường `title`,
            tmdb_id: 1,
            original_title: 1,
            backdrop_path: 1,
            genres: 1,
            release_date: 1,
            vote_average: 1,
          },
        },
        { $limit: 20 },
      ]);

      return res.status(200).json({
        success: true,
        message: "Get recommended based selected movie successfully",
        data: recommendedMovies,
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
