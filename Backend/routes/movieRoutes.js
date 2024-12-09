const express = require("express");
const movieController = require("../controller/movieController");

const router = express.Router();


/**
 * @swagger
 * /api/v1/detail/movie/:idMovie:
 *   post:
 *     summary: Get detail movie
 *     description: Get detail movie
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Detail movie fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/detail/movie/:idMovie", movieController.getDetailMovie);

/**
 * @swagger
 * /api/v1/trending/movie/day:
 *   post:
 *     summary: Get trending movies day
 *     description: Get trending movies day
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Trending movies day fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/trending/movie/day", movieController.getTrendingMoviesDay);

/**
 * @swagger
 * /api/v1/trending/movie/week:
 *   post:
 *     summary: Get trending movies week
 *     description: Get trending movies week
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Trending movies week fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/trending/movie/week", movieController.getTrendingMoviesWeek);

/**
 * @swagger
 * /api/v1/search:
 *   post:
 *     summary: Search movie
 *     description: Search movie
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Search movie successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/search", movieController.searchMovie);

module.exports = router;
