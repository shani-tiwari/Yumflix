const express = require("express");
const router = express.Router();

const {  authUserMware } = require("../middlewares/auth.middleware");
const { getFoodPartnerById } = require("../controllers/foodPartner.controller");


// GET - /food-partner/:id
router.get("/:id", authUserMware, getFoodPartnerById);

module.exports = router