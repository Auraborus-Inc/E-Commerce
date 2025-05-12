const database = require('../databseConnectivity');

exports.homePage = (req, res) => {
    try {
        return res.send(`Welcome to Home Page of the E Commerence Website ... `);
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

exports.registerUser = async (req, res) => {
    const { name, email, password, phone_no, address } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        const existUser = await database('user')
            .where({ email: email })
            .first();

        if (existUser) {
            return res.status(400).send('User already exists');
        }
        await database('user').insert({
            name: name,
            email: email,
            password: password,
            phone_no: phone_no,
            address: address
        });

        return res.status(200).send('User registered successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        const user = await database('user')
            .where({ email: email })
            .andWhere({ password: password })
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

exports.dashboard = async (req, res) => {
    const products = await database('products').select('*');
        return res.status(200).json({
            products: products
        });
}

exports.logoutUser = (req, res) => {
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
