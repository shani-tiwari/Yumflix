const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res, next){
    const {fullName, email, password} =  req.body;  // express.json() - middleware will be used so that tha data can be read here

    const exists = await userModel.findOne({ email });
    if(exists){ 
        return res.status(400).json({
            msg: 'email already registered'
        }) 
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({fullName, email, password: hashPassword});

    // create a token to know that this user is registered user - 
    const token = jwt.sign({
        id: user._id, // unique data
    }, process.env.JWT_SECRET || 'default_secret');

    // saving the token into the cookies
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({ 
        msg: 'registered successfully', 
        user:{ 
            _id: user._id, 
            email: user.email, 
            fullName: user.fullName 
        } 
    });
    /* the cookie makes future authenticated communication transparent and convenient, 
     while the JSON response gives immediate feedback and relevant user details to the frontend right after registration. */

    // next();


}

async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({ email });
    if(!user){ res.status(400).json({ msg: 'invaild creadientals'}) };  // email dosen't exist

    const isPasswordVaild = bcrypt.compare(password, user.password);
    if(!isPasswordVaild) { res.status(400).json({ msg: 'invaild creadientals'}) }; // email exist, password not

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ 
        msg: 'login successful', 
        user:{ 
            _id: user._id, 
            email: user.email, 
            fullName: user.fullName 
        } 
    });

}

module.exports = {
    registerUser, loginUser
}