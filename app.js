const express = require('express');
const session = require('express-session');

const port = 8000;
const app = express();
const cors = require('cors');

// Impoting Routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/catagoryRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const productsRoutes = require('./routes/productsRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/products', productsRoutes);

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});

module.exports = app;
