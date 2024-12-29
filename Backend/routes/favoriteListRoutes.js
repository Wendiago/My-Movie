const express = require("express");
const favoriteListController = require("../controller/favoriteListController");

const router = express.Router();

router.post("/api/v1/add/favorite", favoriteListController.addToList);
router.post("/api/v1/remove/favorite", favoriteListController.removeFromFavorite);
router.get("/api/v1/get/all", favoriteListController.getAllFavoriteList);
module.exports = router;
