const express = require('express');
const session = require('express-session');
const allRoutes = require('./routes/allRoutes.js');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60* 60 }
}));

app.use('/', allRoutes);

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

module.exports = app;

