const database = require('../databseConnectivity');

exports.home = (req, res) => {
    try {
        return res.send('Welcome to Home Page of the E-Commerce Website ...');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await database('user').select('*');
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        const existuser = await database('user')
            .where({ email })
            .orWhere({ password })
            .first();

        if (existuser) {
            return res.status(400).send('User already exists');
        }

        await database('user').insert({ name, email, password });
        return res.status(200).send('User registered successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        const user = await database('user')
            .where({ email, password })
            .first();

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        req.session.user = { id: user.id, email: user.email };
        return res.status(200).send('User logged in successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.dashboard = (req, res) => {
    if (req.session.user) {
        return res.status(200).send(`Welcome to the Dashboard`);
    }
    return res.status(401).send('First Login Please');
};

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            return res.status(200).send('User logged out successfully');
        });
    } else {
        return res.status(401).send('First Login Please');
    }
};
