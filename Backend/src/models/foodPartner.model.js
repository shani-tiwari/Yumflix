const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodPartnerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
  }
});

const foodPartnerModel = mongoose.model('food-partner', foodPartnerSchema);
module.exports = foodPartnerModel;

