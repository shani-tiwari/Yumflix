const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connected'))
    .catch((e) => console.log('db not connected', e));
}
module.exports = connectDB;