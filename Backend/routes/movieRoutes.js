const express = require("express");
const movieController = require("../controller/movieController");
const recommendController = require("../controller/recommendController");
const router = express.Router();

router.get("/trending/day", movieController.getTrendingMoviesDay);
router.get("/trending/week", movieController.getTrendingMoviesWeek);
router.get("/genres", movieController.getAllGenres);
router.get("/trailer/latest", recommendController.getLatestTrailerList);
router.get("/upcoming", recommendController.getLatestTrailerList);
router.get("/:idMovie", movieController.getDetailMovieById);

module.exports = router;
