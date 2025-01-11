const express = require("express");
const searchController = require("../controller/searchController");
const AIController = require("../controller/aiController");
const router = express.Router();

router.get("/movie/name", searchController.searchMovieByName);
router.get("/movie/cast", searchController.searchMovieByCast);
router.get("/movie/ai", AIController.searchMovie);
router.get("/movie/navigate", AIController.searchNavigate);

module.exports = router;