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

/**
 * @swagger
 * /api/v1/genres:
 *   get:
 *     summary: Get all movie genres
 *     description: Fetch the list of movie genres
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Genres fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/genres", movieController.getGenres);

/**
 * @swagger
 * /api/v1/movies/genre/{genreId}:
 *   get:
 *     summary: Get movies by genre
 *     description: Fetch movies filtered by a specific genre
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: genreId
 *         required: true
 *         description: The ID of the genre to filter movies by
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movies with specified genre fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/api/v1/movies/genre/:genreId", movieController.getMoviesByGenre);

module.exports = router;
