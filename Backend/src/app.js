const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/foodPartner.routes');
const cors = require('cors');

const app = express();
app.use(cookieParser()); // middleware to save token in cookies 
app.use(express.json()); // help server to read data - came in req.body

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('hii');
});
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/food-partner', foodPartnerRoutes);

module.exports = app ;