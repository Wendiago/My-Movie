const AccessMiddleware = require("../middlewares/access.middleware");
const userController = require("../controller/user.controller");
const handleAsync = require("../utils/catchAsync");
const router = require("express").Router();

router.use(handleAsync(AccessMiddleware.checkAccess));

router.get("/:id", handleAsync(userController.getUserById));

router.post("/", handleAsync(userController.createNewUser));

router.patch("/:id", handleAsync(userController.updateUser));

router.delete("/:id", handleAsync(userController.deleteUser));

module.exports = router;
