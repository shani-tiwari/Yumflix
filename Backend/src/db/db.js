const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb://localhost:27017/food-view')
    .then(() => console.log('connected'))
    .catch((e) => console.log('db not connected', e));
}
module.exports = connectDB;