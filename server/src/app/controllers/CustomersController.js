require("dotenv").config();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Customer = require("../models/Customer");

class CustomersController {
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
                                    const token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECREC);
                                    res.status(200).json({
                                        statusId: 0,
                                        message: "Correct!!!",
                                        token,
                                        data: {
                                            id: user._id,
                                            name: user.name,
                                            avatar: user.avatar,
                                            phone: user.phone,
                                            address: user.address,
                                        },
                                    });
                                } else {
                                    return res
                                        .status(200)
                                        .json({ statusId: 1, message: "Username or password not true!!!" });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                return res.status(400).json({ statusId: 2, message: "Error!!!" });
                            });
                    } else {
                        return res.status(200).json({ statusId: 1, message: "Username or password not true!!!" });
                    }
                })
                .catch(() => res.status(400).json({ statusId: 2, message: "Login failure!!!" }));
        } else res.status(200).json({ statusId: 1, message: "Username or password not true!!!" });
    }
}

module.exports = new CustomersController();
