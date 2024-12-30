const express = require("express");
const movieController = require("../controller/movieController");

const router = express.Router();


router.get("/api/v1/detail/movie/:idMovie", movieController.getDetailMovieById);
router.get("/api/v1/trending/movie/day", movieController.getTrendingMoviesDay);
router.get("/api/v1/trending/movie/week", movieController.getTrendingMoviesWeek);
router.get("/api/v1/genres", movieController.getAllGenres);

module.exports = router;
