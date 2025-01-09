const express = require("express");
const castController = require("../controller/castController");

const router = express.Router();

router.get("/detail/name/:name", castController.getCastByName);
router.get("/detail/:idCast", castController.getCastById);

module.exports = router;
