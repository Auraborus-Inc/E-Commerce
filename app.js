const express = require('express');
const session = require('express-session');
const port = 8000;
const database = require('./databseConnectivity.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60* 60 }
}));


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

        req.session.user = {id: user.id, email: user.email}
        return res.status(200).send('User logged in successfully')
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error')
    }
})

app.get('/dashboard', async (req, res) => {
    if(req.session.user){
        return res.status(200).send(`Welcome to the Dashboard`)
    }
    return res.status(401).send('First Login Please')
})

app.get('/logout', async (req, res) => {
    if(req.session.user){
        req.session.destroy((err) => {
            if(err){
                console.error(err);
                return res.status(500).send('Internal Server Error')
            }
            return res.status(200).send('User logged out successfully')
        })
    }else{
        return res.status(401).send('First Login Please')
    }
})

app.listen(port, () => {
    console.log("Server Started at http://localhost:8000")
  })

module.exports = app;

