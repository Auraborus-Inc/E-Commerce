const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send(`Hello ${req.query.name} ... 
    Welcome to the Page of Node JS using Express Server
    you are ${req.query.age} years old`)
})

app.post('/submit', (req, res) => {
  return res.send(`Hello ${req.body.name} ... 
    Welcome to the Page of Node JS using Express Server
    you are ${req.body.age} years old`)
});

app.listen(8000, () => {
  console.log("Server Started at http://localhost:8000")
})

module.exports = app;