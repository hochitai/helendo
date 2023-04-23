require("dotenv").config();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Customer = require("../models/Customer");
const authService = require("../services/authService");
const constants = require("../constants");

class CustomersController {
    // [POST]  /customers/register
    async register(req, res, next) {
        const data = req.body;
        if (
            validator.isAlphanumeric(data.userName) &&
            validator.isLength(data.userName, { min: 3, max: 16 }) &&
            validator.isStrongPassword(data.password) &&
            validator.isAlphanumeric(data.name) &&
            validator.isLength(data.name, { min: 3, max: 16 }) &&
            validator.isMobilePhone(data.phone, "vi-VN")
        ) {
            await Customer.findOne({ userName: data.userName })
                .then(async (user) => {
                    if (user) {
                        return res.status(200).json({ statusId: 1, message: "Username Existed!!!" });
                    } else {
                        await Customer.create({
                            ...data,
                            password: await bcrypt.hash(data.password, saltRounds),
                        })
                            .then(() => res.status(200).json({ statusId: 0, message: "Create successful!!" }))
                            .catch(() => {
                                return res.status(400).json({ statusId: 2, message: "Create failure!!!" });
                            });
                    }
                })
                .catch(() => res.status(400).json({ statusId: 2, message: "Create failure!!!" }));
        } else return res.status(200).json({ statusId: 1, message: "Create failure!!!" });
    }

    // [POST]  /customers/login
    async login(req, res, next) {
        const data = req.body;
        console.log(data.password);
        if (validator.isAlphanumeric(data.userName) && validator.isLength(data.userName, { min: 3, max: 16 })) {
            await Customer.findOne({ userName: data.userName })
                .then(async (user) => {
                    if (user) {
                        bcrypt
                            .compare(data.password, user.password)
                            .then((isEqual) => {
                                if (isEqual) {
                                    const token = authService.generateAccessToken(
                                        { name: user.name },
                                        constants.EXPIRE_TIME_ACCESS_TOKEN
                                    );
                                    const refreshToken = authService.generateRefreshToken(
                                        { name: user.name },
                                        constants.EXPIRE_TIME_REFRESH_TOKEN
                                    );
                                    res.cookie("token", token, { maxAge: constants.EXPIRE_TIME_ACCESS_TOKEN });
                                    res.cookie("refresh-token", refreshToken, {
                                        maxAge: constants.EXPIRE_TIME_REFRESH_TOKEN,
                                    });
                                    res.cookie("info", {
                                        id: user._id,
                                        name: user.name,
                                        avatar: user.avatar,
                                        phone: user.phone,
                                        address: user.address,
                                    });
                                    res.status(200).json({
                                        statusId: 0,
                                        message: "Correct!!!",
                                    });
                                } else {
                                    return res
                                        .status(200)
                                        .json({ statusId: 1, message: "Username or password is not true!!!" });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                return res.status(400).json({ statusId: 2, message: "Error!!!" });
                            });
                    } else {
                        return res.status(200).json({ statusId: 1, message: "Username or password is not true!!!" });
                    }
                })
                .catch(() => res.status(400).json({ statusId: 2, message: "Login failure!!!" }));
        } else res.status(200).json({ statusId: 1, message: "Username or password is not true!!!" });
    }

    // [POST]  /customers/updateInfo
    async updateInfomation(req, res, next) {
        const token = req.cookies.token;
        const customer = JSON.parse(req.cookies.info);
        const customerID = customer.id;

        const data = req.body;
        console.log(data);
        if (
            validator.isAlphanumeric(data.name) &&
            validator.isLength(data.name, { min: 3, max: 16 }) &&
            validator.isLength(data.address, { min: 4, max: 200 }) &&
            validator.isMobilePhone(data.phone, "vi-VN")
        ) {
            await Customer.findByIdAndUpdate(
                { _id: customerID },
                { $set: { name: data.name, address: data.address, phone: data.phone } }
            )
                .then((result) =>
                    res.status(200).json({
                        statusId: 0,
                        message: "Correct!!!",
                    })
                )
                .catch((error) => res.status(400).json({ statusId: 2, message: "Error!!!" }));
        } else {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [POST]  /customers/changePassword
    async changePassword(req, res, next) {
        const token = req.cookies.token;
        const customer = JSON.parse(req.cookies.info);
        const customerID = customer.id;

        const data = req.body;
        console.log(data);
        if (validator.isStrongPassword(data.newPassword) && validator.isStrongPassword(data.repeatNewPassword)) {
            await Customer.findOne({ _id: customerID }).then(async (user) => {
                bcrypt
                    .compare(data.password, user.password)
                    .then(async (isEqual) => {
                        if (isEqual) {
                            if (data.password !== data.newPassword) {
                                const newPw = await bcrypt.hash(data.newPassword, saltRounds);
                                Customer.findByIdAndUpdate({ _id: customerID }, { $set: { password: newPw } })
                                    .then((result) =>
                                        res.status(200).json({
                                            statusId: 0,
                                            message: "Correct!!!",
                                        })
                                    )
                                    .catch((error) => res.status(400).json({ statusId: 2, message: "Error!!!" }));
                            } else {
                                return res.status(200).json({ statusId: 1, message: "Error!!!" });
                            }
                        } else {
                            return res.status(200).json({ statusId: 1, message: "Password is not true!!!" });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.status(400).json({ statusId: 2, message: "Error!!!" });
                    });
            });
        } else {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /customer/
    async getAll(req, res, next) {
        const token = req.cookies.token;
        const user = req.cookies.resource;
        try {
            if (user) {
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                await Customer.find({})
                    .then((result) =>
                        res.status(200).json({ statusId: 0, message: "Created product successful!!!", data: result })
                    )
                    .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
            } else {
                return res.status(400).json({ statusId: 2, message: "Error!!!" });
            }
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }
}

module.exports = new CustomersController();
