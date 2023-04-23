require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
    generateAccessToken: (data, timeExpired) => {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: timeExpired,
        });
        return token;
    },
    generateRefreshToken: (data, timeExpired) => {
        return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: timeExpired,
        });
    },
    checkAccessToken: (userToken) => {
        try {
            jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    },
    checkRefreshToken: (userToken) => {
        try {
            jwt.verify(userToken, process.env.REFRESH_TOKEN_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    },
};
