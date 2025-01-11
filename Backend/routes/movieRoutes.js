const express = require("express");
const movieController = require("../controller/movieController");
const latestTrailerController = require("../controller/latestTrailerController");
const router = express.Router();

router.get("/trending/day", movieController.getTrendingMoviesDay);
router.get("/trending/week", movieController.getTrendingMoviesWeek);
router.get("/genres", movieController.getAllGenres);
router.get("/trailer/latest", latestTrailerController.getLatestTrailerList);
router.get("/:idMovie", movieController.getDetailMovieById);

module.exports = router;