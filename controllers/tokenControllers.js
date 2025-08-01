exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken)
        return res.status(401).send("Refresh Token is Null");

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).send("Refresh Token not Available");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const userFromDb = await database('user')
            .where({ id: decoded.id })
            .first();

        if (!userFromDb) {
            return res.status(404).send("User not found");
        }

        const accessToken = exports.generateAccessToken(userFromDb);

        return res.json({
            token: accessToken,
            refreshToken: refreshToken,
            user: {
                id: userFromDb.id,
                name: userFromDb.name,
                email: userFromDb.email,
                phone_no: userFromDb.phone_no,
                address: userFromDb.address
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(403).send("Invalid Refresh Token");
    }
};



exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).send("No Tken Avaialable");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return res.status(403).send("Invalid Token");
        req.user  = user
        next()
    })
}

exports.generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    return jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        {expiresIn: "15s"}
    );
}