const authService = require("../services/authService");
const constants = require("../constants");

module.exports = function AuthMiddleware(req, res, next) {
    const cookies = req.cookies;
    if (cookies["refresh-token"]) {
        if (authService.checkRefreshToken(cookies["refresh-token"])) {
            if (!cookies.token || !authService.checkAccessToken(cookies.token)) {
                if (req.cookies.info) {
                    const customer = req.cookies.info;
                    const token = authService.generateAccessToken({ name: customer.name });
                    res.cookie("token", token, { maxAge: constants.EXPIRE_TIME_ACCESS_TOKEN });
                    console.log("Cap nhat lai access token");
                } else {
                    return res.status(403).json({ status: 1, message: "Your session is expired" });
                }
            }
            next();
        } else {
            return res.status(403).json({ status: 1, message: "Your session is expired" });
        }
    } else {
        return res.status(403).json({ status: 1, message: "Your session is expired" });
    }
};
