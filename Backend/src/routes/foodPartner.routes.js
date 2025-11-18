const express = require("express");
const router = express.Router();

const {  authFoodPartnerMware } = require("../middlewares/auth.middleware");
const { getFoodPartnerById } = require("../controllers/foodPartner.controller");


// GET - /food-partner/:id
router.get("/:id", authFoodPartnerMware, getFoodPartnerById);

module.exports = router