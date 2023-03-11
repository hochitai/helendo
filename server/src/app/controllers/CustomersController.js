const bcrypt = require("bcrypt");
const saltRounds = 10;
const Customer = require("../models/Customer");

class CustomersController {
    async register(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        const data = req.body;
        await Customer.create({
            ...data,
            passWord: await bcrypt.hash(data.passWord, saltRounds),
        })
            .then(() => res.status(200).json({ errorID: 0, message: "Create successful!!" }))
            .catch(() => {
                res.status(400).json({ errorID: 1, message: "Create failure!!!" });
            });
    }

    async login(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        // await Customer.create(req.body)
        //     .then(() => res.status(200).json({ errorID: 0, message: "Create successful!!" }))
        //     .catch(() => {
        //         res.status(400).json({ errorID: 1, message: "Create failure!!!" });
        //     });
    }
}

module.exports = new CustomersController();
