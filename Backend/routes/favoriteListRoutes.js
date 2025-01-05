const express = require("express");
const favoriteListController = require("../controller/favoriteListController");

const router = express.Router();

router.post("/api/v1/favorites", favoriteListController.addToList);
router.delete(
  "/api/v1/favorites/:idMovie",
  favoriteListController.removeFromFavorite
);
router.get("/api/v1/favorites", favoriteListController.getAllFavoriteList);
module.exports = router;
