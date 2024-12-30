const express = require("express");
const movieController = require("../controller/movieController");

const router = express.Router();


router.get("/api/v1/detail/movie/:idMovie", movieController.getDetailMovieById);
router.get("/api/v1/trending/movie/day", movieController.getTrendingMoviesDay);
router.get("/api/v1/trending/movie/week", movieController.getTrendingMoviesWeek);
router.get("/api/v1/genres", movieController.getAllGenres);

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
