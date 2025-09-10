require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { validateEnv } = require("./config/validateEnv.js");

const port = 8000;
const app = express();
const cors = require('cors');

validateEnv(process.env);


// Impoting Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/catagoryRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productMediaRoutes = require("./routes/productMediaRoutes");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/productMedia", productMediaRoutes);

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});

module.exports = app;
