const express = require("express");
const recommendController = require("../controller/recommendController");
const AccessMiddleware = require("../middlewares/access.middleware");
const handleAsync = require("../utils/catchAsync");
const router = express.Router();

router.use(handleAsync(AccessMiddleware.checkAccess));

router.get("/movie", recommendController.getRecommendationBasedFavoriteList);
module.exports = router;
