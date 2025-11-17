const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Authentication
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
    }, process.env.JWT_SECRET );

    // saving the token into the cookies
    // res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    // res.cookie("token", token, { httpOnly: true, secure: false }); // or don't use it, so that the cookie from frontend can be saved
    res.cookie("token", token); // or don't use it, so that the cookie from frontend can be saved

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


};

async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({ email });
    if(!user){ res.status(400).json({ msg: 'invaild creadientals'}) };  // email dosen't exist

    const isPasswordVaild = bcrypt.compare(password, user.password);
    if(!isPasswordVaild) { res.status(400).json({ msg: 'invaild creadientals'}) }; // email exist, password not

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({ 
        msg: 'login successful', 
        user:{ 
            _id: user._id, 
            email: user.email, 
            fullName: user.fullName 
        } 
    });

};

async function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({ msg: 'logout'});
};


// Food Partner Authentication
async function registerFoodPartner(req, res) {
    const {fullName, email, password, phone, address, contactName} =  req.body;  // express.json() - middleware will be used so that tha data can be read here

    const exists = await foodPartnerModel.findOne({ email });
    if(exists){ 
        return res.status(400).json({
            msg: 'food partner account already registered'
        }) 
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({fullName, email, password: hashPassword, phone, address, contactName});

    const token = jwt.sign({
        id: foodPartner._id, // unique data
    }, process.env.JWT_SECRET);

    // saving the token into the cookies
    res.cookie("token", token);

    res.status(201).json({ 
        msg: 'food Partner registered successfully', 
        foodPartner:{ 
            _id: foodPartner._id, 
            email: foodPartner.email, 
            fullName: foodPartner.fullName ,
            phone: foodPartner.phone, 
            address: foodPartner.address, 
            contactName: foodPartner.contactName,
        } 
    });
};

async function loginFoodPartner(req, res) {
    const {email, password} = req.body;
    console.log(email, password);

    const foodPartner = await foodPartnerModel.findOne({ email });
    if(!foodPartner){ res.status(400).json({ msg: 'invaild creadientals'}) };  // email dosen't exist
    
    console.log(foodPartner.password);
    // const isPasswordVaild = bcrypt.compare(password, foodPartner.password);
    const isPasswordVaild = bcrypt.compare(password, "$2b$10$03jxvwbHHRMGqNmCqb57D..4AEBDGfG6PeDYDoQWo.HNhhvgvzkYy");
    if(!isPasswordVaild) { res.status(400).json({ msg: 'invaild creadientals'}) }; // email exist, password not

    const token = jwt.sign({
        id:foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({ 
        msg: ' Food Partner login successful', 
        foodPartner:{ 
            _id: foodPartner._id, 
            email: foodPartner.email, 
            fullName: foodPartner.fullName 
        } 
    });

};

function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({ msg: "logout food partner successfully"});
};



module.exports = {
    registerUser, loginUser, logoutUser, 
    registerFoodPartner, loginFoodPartner, logoutFoodPartner
}