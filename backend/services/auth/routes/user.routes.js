const router = require("express").Router();
const passport = require("passport");
const { authGuard, restrict } = require("../../../middlewares/authMiddleware");
const validateRequest = require("../../../middlewares/validateMiddleware");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  refreshToken,
  getDashboard,
  oauthCallback,
} = require("../controllers/user.contoller");
const { createUserSchema } = require("../validators/user.validator");

router.post("/createUser", validateRequest(createUserSchema), createUser);
router.post("/loginUser", loginUser);
router.get("/getMe/:id", authGuard, getUser);
router.put("/updateUser/:id", authGuard, updateUser);
router.delete("/deleteUser/:id", authGuard, deleteUser);
router.post("/refresh-token", refreshToken);

// Get dashbaord data after login
// router.get("/getDashboard", authGuard, getDashboard);

// authentication for facebook google and apple

// Google OAuth route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  oauthCallback
);

// Facebook OAuth route
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  oauthCallback
);

// Apple OAuth route
router.get("/auth/apple", passport.authenticate("apple"));
router.get(
  "/auth/apple/callback",
  passport.authenticate("apple", { session: false }),
  oauthCallback
);

module.exports = router;

module.exports = router;
