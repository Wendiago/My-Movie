const express = require("express");
const recommendController = require("../controller/recommendController");

const router = express.Router();

router.get("/api/v1/recommend/movie", recommendController.getRecommendationBasedFavoriteList);
router.get("/api/v1/recommend/movie/upcoming", recommendController.getLatestTrailerList);
router.get("/api/v1/recommend/movie/upcoming/set", recommendController.setLatestTrailerList);
module.exports = router;