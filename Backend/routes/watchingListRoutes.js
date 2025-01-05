const express = require("express");
const watchingListController = require("../controller/watchingListController");

const router = express.Router();

router.post("/api/v1/add/watching", watchingListController.addToList);
router.post("/api/v1/remove/watching", watchingListController.removeFromList);
router.get("/api/v1/get/watching", watchingListController.getAllWatchingList);
module.exports = router;
