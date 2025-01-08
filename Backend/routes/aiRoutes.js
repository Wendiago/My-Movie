const express = require("express");
const AIController = require("../controller/aiController");

const router = express.Router();

router.get("/api/v1/search/ai/movie", AIController.searchMovie);
router.get("/api/v1/search/navigate", AIController.searchNavigate);
module.exports = router;