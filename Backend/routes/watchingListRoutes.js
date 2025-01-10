const express = require("express");
const watchingListController = require("../controller/watchingListController");
const AccessMiddleware = require("../middlewares/access.middleware");
const handleAsync = require("../utils/catchAsync");
const router = express.Router();

router.use(handleAsync(AccessMiddleware.checkAccess));
router.post("/", watchingListController.addToList);
router.delete("/:idMovie", watchingListController.removeFromList);
router.get("/", watchingListController.getAllWatchingList);
module.exports = router;
