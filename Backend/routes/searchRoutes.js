const express = require("express");
const searchController = require("../controller/searchController");

const router = express.Router();

router.get("/api/v1/search/movie/name", searchController.searchMovieByName);
router.get("/api/v1/search/movie/cast", searchController.searchMovieByCast);
module.exports = router;
