const catchAsync = require("../utils/catchAsync");
const customApi = require("../utils/customApi");

const MovieUpcoming = require("../models/movies_upcoming");
const LatestTrailerList = require("../models/latest_trailer_list");

const latestTrailerController = {
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

      latestTrailerListIdTMDB.forEach(async (movieId) => {
        const data = await customApi(`movie/${movieId}/videos`);
        if (data.results.length === 0 || data.success === false) {
          console.log("No trailer found for movie", movieId);
        } else {
          const newLatestTrailerList = new LatestTrailerList({
            tmdb_id: movieId,
            key: data.results[0].key,
          });
          await newLatestTrailerList.save();
        }
      });

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
      const latestTrailerList = await LatestTrailerList.find().populate({
        path: "tmdb_id",
        model: "movies",
        localField: "tmdb_id",
        foreignField: "tmdb_id",
        select:
          "title release_date genres backdrop_path original_title poster_path",
      });

      const List = latestTrailerList
        .filter(
          (movie) => movie.tmdb_id && movie.tmdb_id.backdrop_path !== null
        )
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

module.exports = latestTrailerController;
