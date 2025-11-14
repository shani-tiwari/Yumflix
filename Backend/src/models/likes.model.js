const mongoose = require('mongoose');
const {Schema} = mongoose;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    },
}, {timestamps: true });

const likeModel = mongoose.model('like', likeSchema);
module.exports = likeModel;