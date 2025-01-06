const express = require("express");
const ratingListController = require("../controller/ratingListController");

const router = express.Router();

router.post("/api/v1/ratings", ratingListController.addToList);
router.delete("/api/v1/ratings/:idMovie", ratingListController.removeFromList);
router.get("/api/v1/ratings", ratingListController.getAllRatingList);
module.exports = router;
