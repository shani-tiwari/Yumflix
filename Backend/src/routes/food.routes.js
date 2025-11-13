const express = require("express");
const router = express.Router();
const { createFood, getFoodItems } = require('../controllers/food.controller');
const { authFoodPartnerMware, authUserMware } = require('../middlewares/auth.middleware');


// to read file type data in express
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});


// POST - /food/ - [protected](only food partner can add or remove) - for food partners
router.post('/' , authFoodPartnerMware , upload.single("first-food-item-video") , createFood );  // video - file name, given while sending the file

// GET - /food/ - [protected] - for users
router.get('/', authUserMware , getFoodItems)



module.exports = router;