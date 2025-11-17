const foodModel = require('../models/food.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
const {v4: uid} = require('uuid');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');


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
};



async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

        const isAlreadyLiked = await likeModel.findOne({
           user: user._id,
           food: foodId
       });
        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            })
    
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })
    
            return res.status(200).json({
                message: "Food unliked successfully"
            });
        };
        // if not liked yet, create like
        const like = await likeModel.create({
            user: user._id,
            food: foodId
        })
     
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })
    
        res.status(201).json({
            message: "Food liked successfully",
            like
        });
    
};

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}



module.exports = {
    createFood, getFoodItems, likeFood, saveFood, getSaveFood
}