const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res, next){
    const {igName, email, password} =  req.body;  // express.json() - middleware will be used so that tha data can be read here

    const exists = await userModel.findOne({ email });
    if(exists){ 
        return res.status(400).json({
            msg: 'email already registered'
        }) 
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({igName, email, password: hashPassword});

    // create a token to know that this user is user
    const token = jwt.sign({
        id: user._id, // unique data
    }, process.env.JWT_SECRET || 'default_secret');

    // saving the token into the cookies
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ 
        msg: 'registered successfully', 
        user:{ 
            _id: user._id, 
            email: user.email, 
            igName: user.igName 
        } 
    });
    /* the cookie makes future authenticated communication transparent and convenient, 
     while the JSON response gives immediate feedback and relevant user details to the frontend right after registration. */

    // next();


}

module.exports = {
    registerUser
}