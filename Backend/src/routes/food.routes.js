const express = require("express");
const router = express.Router();

const { authFoodPartnerMware, authUserMware } = require("../middlewares/auth.middleware");
const { createFood, getFoodItems, likeFood, saveFood, getSaveFood } = require("../controllers/food.controller");


// to read file type data in express
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

// POST - /food/ - [protected](only food partner can add or remove) - for food partners
router.post("/", 
    authFoodPartnerMware, 
    upload.single("video"), 
    createFood); // video - file name, given while sending the file


// GET - /food/ - [protected] - for users
router.get("/", 
    authUserMware, 
    getFoodItems);


router.post('/like', 
    authUserMware, 
    likeFood);


router.post('/save', 
    authUserMware, 
    saveFood);

router.get('/save', 
    authUserMware,
    getSaveFood
)

module.exports = router;
