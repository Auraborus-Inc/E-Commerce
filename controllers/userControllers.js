const database = require('../databseConnectivity');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await database('user').select('*');
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password, phone_no, address } = req.body;
    console.log(req.body);
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

        return res.status(200).send('User created successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await database('user')
            .where({ email: email })

        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.updateUserByEmail = async (req, res) => {
    const { email } = req.params;
    const { name, phone_no, address } = req.body;

    try {
        const user = await database('user')
            .where({ email: email })
            .first();

        if (!user) {
            return res.status(404).send('User not found');
        }

        await database('user')
            .where({ email: email })
            .update({
                name: name,
                phone_no: phone_no,
                address: address
            });

        return res.status(200).send('User updated successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.deleteUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await database('user')
            .where({ email: email })
            .first();

        if (!user) {
            return res.status(404).send('User not found');
        }

        await database('user')
            .where({ email: email })
            .del();

        return res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};