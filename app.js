const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const port = 8000;``

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});

module.exports = app;
