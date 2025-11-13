const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "login!!, Unauthorize Access" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verified - decoded get all data
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    req.foodPartner = foodPartner; // creating new property and setting value
    next();
  } catch (error) {
    // verify failed - error throw
    return res.status(401).json({ msg: "Invaild token" });
  }
}

async function authUserMware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "login!!, Unauthorize Access" });
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verified - decoded get all data
    const user = await userModel.findById(decoded.id);
    req.user = user; // creating new property and setting value
    next();
  } catch (error) {
    // verify failed - error throw
    return res.status(401).json({ msg: "Invaild token" });
  }
}

module.exports = {
  authFoodPartnerMware,
  authUserMware,
};
