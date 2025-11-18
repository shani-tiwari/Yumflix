const cors              = require('cors');
const express           = require('express');
const cookieParser      = require('cookie-parser');
const authRoutes        = require('./routes/auth.routes');
const foodRoutes        = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/foodPartner.routes');

const app = express();
app.use(cookieParser()); // middleware to save token in cookies 
app.use(express.json()); // help server to read data - came in req.body

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
    // "https://yumflix-1-frontend.onrender.com/",
   "https://yumflix-1-frontend.onrender.com",
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('hii');
});
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/food-partner', foodPartnerRoutes);

module.exports = app ;