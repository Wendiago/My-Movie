const express = require("express");
const ratingListController = require("../controller/ratingListController");

const router = express.Router();

router.post("/api/v1/add/rating", ratingListController.addToList);
router.post("/api/v1/remove/rating", ratingListController.removeFromList);
router.get("/api/v1/get/rating", ratingListController.getAllRatingList);
module.exports = router;
