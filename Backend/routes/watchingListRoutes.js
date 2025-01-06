const express = require("express");
const watchingListController = require("../controller/watchingListController");

const router = express.Router();

router.post("/api/v1/watchings", watchingListController.addToList);
router.delete("/api/v1/watchings/:idMovie", watchingListController.removeFromList);
router.get("/api/v1/watchings", watchingListController.getAllWatchingList);
module.exports = router;
