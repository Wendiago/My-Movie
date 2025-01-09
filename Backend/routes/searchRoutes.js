const express = require("express");
const searchController = require("../controller/searchController");

const router = express.Router();

router.get("/movie/name", searchController.searchMovieByName);
router.get("/movie/cast", searchController.searchMovieByCast);
module.exports = router;
