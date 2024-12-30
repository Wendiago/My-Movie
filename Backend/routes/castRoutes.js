const express = require("express");
const castController = require("../controller/castController");

const router = express.Router();

router.get("/api/v1/detail/cast/name/:name", castController.getCastByName);
router.get("/api/v1/detail/cast/:idCast", castController.getCastById);

module.exports = router;
