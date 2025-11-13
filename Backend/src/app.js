const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');

const app = express();
app.use(cookieParser()); // middleware to save token in cookies 
app.use(express.json()); // help server to read data - came in req.body

app.get('/', (req, res) => {
    res.send('hii');
});
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);

module.exports = app ;