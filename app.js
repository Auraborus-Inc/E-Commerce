const express = require('express');
const port = 8000;
const database = require('./databseConnectivity.js');

const app = express();


app.get('/Home', async (req, res) => {
    try {
        const products = await database.getProducts();
        console.log(products);
        return res.send(`Welcome to Home Page Mr. Abdullah. Products: ${JSON.stringify(products)}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

// database.client.end();
module.exports = app;
