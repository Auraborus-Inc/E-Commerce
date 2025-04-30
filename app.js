const express = require('express');
const port = 8000;
const database = require('./databseConnectivity.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/Home', (req, res) => {
    try {
        return res.send(`Welcome to Home Page of the E Commerence Website ... `);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/all_users', async (req, res) => {
    try {
        const users = await database('user').select('*');
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/register', async (req, res) =>{
    const {name, email, password, phone_no, address} = req.body;
    if(!name || !email || !password){
        return res.status(400).send('Please fill all the fields')
    }

    try{
        const existuser = await database('user')
        .where({ email: email })
        .orWhere({ password: password })
        .first()
        if(existuser){
            return res.status(400).send('User already exists')
        }

        await database('user').insert({
            name: name,
            email: email,
            password: password
        })
        return res.status(200).send('User registered successfully')
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal Server Error')
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please fill all the fields')
    }

    try {
        const user = await database('user')
            .where({ email: email })
            .andWhere({ password: password })
            .first()
        if (!user) {
            return res.status(400).send('Invalid credentials')
        }
        return res.status(200).send('User logged in successfully')
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

module.exports = app;

