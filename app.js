const express = require('express');
const port = 8000;
const database = require('./databseConnectivity.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

  app.post('/register', async (req, res) =>{
    console.log(req.body)
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).send('Please fill all the fields')
    }

    try{
        const existuser = await database('user')
        .where({ email: email })
        .orwhere({ phone_no: phone_no })
        .first()
        if(existuser){
            return res.status(400).send('User already exists')
        }

        await database('user').insert({
            name: name,
            email: email,
            password: password,
        })
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal Server Error')
    }
  })

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

module.exports = app;

