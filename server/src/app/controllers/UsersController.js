require("dotenv").config();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const UserPermissionResource = require("../models/UserPermissionResource");

class UsersController {
    async register(req, res, next) {}

    async login(req, res, next) {
        const data = req.body;
        console.log(data.password);
        if (validator.isAlphanumeric(data.userName) && validator.isLength(data.userName, { min: 3, max: 16 })) {
            await User.findOne({ userName: data.userName })
                .then(async (user) => {
                    if (user) {
                        bcrypt
                            .compare(data.password, user.password)
                            .then(async (isEqual) => {
                                if (isEqual) {
                                    console.log(user);
                                    const token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECREC);
                                    await UserPermissionResource.aggregate([
                                        {
                                            $match: {
                                                userID: user._id,
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: "resources",
                                                localField: "resourceID",
                                                foreignField: "id",
                                                as: "resource",
                                            },
                                        },
                                    ])

                                        .then((result) => {
                                            console.log(result);
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
                                                resource: result,
                                            });
                                        })
                                        .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
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
}

module.exports = new UsersController();
