const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb://localhost:27017/ig_idea_user')
    .then(() => console.log('connected'))
    .catch((e) => console.log('db not connected', e));
}
module.exports = connectDB;