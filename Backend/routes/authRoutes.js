const AuthController = require("../controller/auth.controller");
const handleAsync = require("../utils/catchAsync");

const router = require("express").Router();

router.post("/signup", handleAsync(AuthController.handleSignup));
router.post("/login", handleAsync(AuthController.handleLogin));
router.post(
  "/invoke-new-tokens",
  handleAsync(AuthController.handleInvokeNewTokens)
);
router.post("/verify/send-otp", handleAsync(AuthController.handleVerifyEmail));
router.post("/verify/confirm-otp", handleAsync(AuthController.handleVerifyOTP));

router.post("/google/auth", handleAsync(AuthController.handleLoginWithGoogle));

router.post(
  "/reset-password/send-otp",
  handleAsync(AuthController.handleSendOTPToResetPassword)
);

router.post(
  "/reset-password/confirm-otp",
  handleAsync(AuthController.handleConfirmOTPToResetPassword)
);

router.post("/reset-password", handleAsync(AuthController.handleResetPassword));

router.post("/logout", handleAsync(AuthController.handleLogout));

module.exports = router;
