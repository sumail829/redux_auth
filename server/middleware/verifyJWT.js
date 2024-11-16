const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the header starts with "Bearer"
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    // Extract the token after "Bearer"
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden if token verification fails
            req.user = decoded.UserInfo.username; // Assuming "UserInfo" structure in payload
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;