const express = require('express');
const port = 8000;
const database = require('./databseConnectivity.js');

const app = express();


app.get('/Home', async (req, res) => {
    try {
        const products = await database.getProducts();
        console.log(products);
        return res.send(`Welcome to Home Page Mr. ${req.query.name}. Products: ${JSON.stringify(products)}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/submit', (req, res) => {
    return res.send(`Hello ${req.body.name} ... 
      Welcome to the Page of Node JS using Express Server
      you are ${req.body.age} years old`)
  });

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

module.exports = app;

