const foodModel = require('../models/food.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
const {v4: uid} = require('uuid');


async function createFood(req, res){
    // have the access of req.foodPartner
    const fileUploadRes = await uploadFile(req.file.buffer, uid());
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadRes.url,
        foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
        msg: 'food item created',
        foodItem,
    });
};

async function getFoodItems(req, res){
    const foodItmes = await foodModel.find({});
    res.status(200).json({
        msg: "food Items fetched",
        foodItmes,
    });
}

module.exports = {
    createFood, getFoodItems
}