const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} = require("../controllers/authController");

// User Auth API's
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.post("/user/register", registerUser);

// Food Partner API's
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);
router.post("/food-partner/register", registerFoodPartner);

module.exports = router;
