const foodModel = require('../models/food.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
const {v4: uid} = require('uuid');


async function createFood(req, res){
    // have the access of req.foodPartner
    const fileUploadRes = await uploadFile(req.file.buffer, uid());
    console.log(fileUploadRes);
    res.send('created');


};

module.exports = {
    createFood,
}