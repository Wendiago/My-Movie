const express = require("express");
const favoriteListController = require("../controller/favoriteListController");
const AccessMiddleware = require("../middlewares/access.middleware");
const handleAsync = require("../utils/catchAsync");
const router = express.Router();

router.use(handleAsync(AccessMiddleware.checkAccess));

router.post("/", favoriteListController.addToList);
router.delete("/:idMovie", favoriteListController.removeFromFavorite);
router.get("/", favoriteListController.getAllFavoriteList);
module.exports = router;
