const express = require("express");
const recommendController = require("../controller/recommendController");

const router = express.Router();

router.get(
  "/api/v1/recommend/movie",
  recommendController.getRecommendationBasedFavoriteList
);
router.get(
  "/api/v1/recommend/latest/trailer",
  recommendController.getLatestTrailerList
);
router.get(
  "/api/v1/recommend/movie/upcoming",
  recommendController.getLatestTrailerList
);
module.exports = router;
