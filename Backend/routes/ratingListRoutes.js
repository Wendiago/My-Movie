const express = require("express");
const ratingListController = require("../controller/ratingListController");
const AccessMiddleware = require("../middlewares/access.middleware");
const handleAsync = require("../utils/catchAsync");
const router = express.Router();

router.use(handleAsync(AccessMiddleware.checkAccess));

router.post("/", ratingListController.addToList);
router.delete("/:idMovie", ratingListController.removeFromList);
router.get("/", ratingListController.getAllRatingList);
module.exports = router;
