const authService = require("../services/authService");
const constants = require("../constants");

module.exports = function AuthMiddleware(req, res, next) {
    const cookies = req.cookies;
    if (cookies.refreshToken) {
        if (authService.checkRefreshToken(cookies.refreshToken)) {
            if (!cookies.token || !authService.checkAccessToken(cookies.token)) {
                if (req.cookies.info) {
                    console.log("Cap nhat lai access token");
                    const customer = req.cookies.info;
                    const token = authService.generateAccessToken(
                        { name: customer.name },
                        constants.EXPIRE_TIME_ACCESS_TOKEN.toString()
                    );
                    return res.status(401).json({ status: 1, message: "Update your token", token });
                } else {
                    return res.status(403).json({ status: 1, message: "Your session is expired" });
                }
            } else {
                next();
            }
        } else {
            return res.status(403).json({ status: 1, message: "Your session is expired" });
        }
    } else {
        return res.status(403).json({ status: 1, message: "Your session is expired" });
    }
};
