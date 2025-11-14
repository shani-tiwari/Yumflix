const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  video: {
    type: String, // url of a video
  },
  description: {
    type: String,
  },
  foodPartner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'foodPartner'
  },
  likeCount:{
    type: Number,
    default: 0,
  },
  savesCount: {
    type: Number,
    default: 0,
  }
});

const foodModel = mongoose.model('food', foodSchema);
module.exports = foodModel;

