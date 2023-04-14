require("dotenv").config();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Bill = require("../models/Bill");
const BillDetail = require("../models/BillDetail");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

class BillsController {
    //  [GET] /bills/statistic
    getStatisticOfYear(req, res, next) {
        const token = req.cookies.token;
        const user = req.cookies.resource;
        // const year = req.query.year;
        try {
            if (user) {
                jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
                Bill.aggregate([
                    {
                        $group: {
                            _id: { ...{ month: { $month: "$updatedAt" } }, ...{ year: { $year: "$updatedAt" } } },
                            total: { $sum: "$total" },
                        },
                    },
                ])
                    .then((result) => res.status(200).json(result))
                    .catch((error) => res.status(400).json({ statusId: 2, message: "Error!!!" }));
            } else {
                return res.status(400).json({ statusId: 2, message: "Error!!!" });
            }
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /bills/state
    async getBillByState(req, res, next) {
        const token = req.cookies.token;
        const user = req.cookies.resource;
        const state = req.query.state;
        console.log(state);
        try {
            if (user) {
                jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
                await Bill.find({ state: state })
                    .sort({ createdAt: -1 })
                    .then((result) => res.status(200).json(result))
                    .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
            } else {
                return res.status(400).json({ statusId: 2, message: "Error!!!" });
            }
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /bills/all
    async getAll(req, res, next) {
        const token = req.cookies.token;
        const user = req.cookies.resource;
        try {
            if (user) {
                jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
                await Bill.find({})
                    .sort({ createdAt: -1 })
                    .then((result) => res.status(200).json(result))
                    .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
            } else {
                return res.status(400).json({ statusId: 2, message: "Error!!!" });
            }
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /bills/:customerID/:id
    async getDetailByIDofCustomer(req, res, next) {
        const token = req.cookies.token;
        const id = req.params.id;
        const customerID = req.params.customerID;
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);

            let billInfo;

            await Bill.findOne({ _id: id, customerID: customerID })
                .then(async (result) => {
                    console.log(result);
                    billInfo = result;
                    await BillDetail.aggregate([
                        {
                            $match: {
                                billID: billInfo._id,
                            },
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "productID",
                                foreignField: "_id",
                                as: "product",
                            },
                        },
                    ])
                        .then((result) => {
                            console.log(result);
                            res.status(200).json({ billInfo, data: result });
                        })
                        .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
                })
                .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /bills/:id
    async getDetailByID(req, res, next) {
        const token = req.cookies.token;
        const customer = JSON.parse(req.cookies.info);
        const customerID = customer.id;
        const id = req.params.id;
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);

            let billInfo;

            await Bill.findOne({ _id: id, customerID: customerID })
                .then(async (result) => {
                    console.log(result);
                    billInfo = result;
                    await BillDetail.aggregate([
                        {
                            $match: {
                                billID: billInfo._id,
                            },
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "productID",
                                foreignField: "_id",
                                as: "product",
                            },
                        },
                    ])
                        .then((result) => {
                            console.log(result);
                            res.status(200).json({ billInfo, data: result });
                        })
                        .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
                })
                .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /bills
    async getByID(req, res, next) {
        const token = req.cookies.token;
        const customer = JSON.parse(req.cookies.info);
        const customerID = customer.id;

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
            await Bill.find({
                customerID: customerID,
            })
                .then((result) => res.status(200).json(result))
                .catch(() => res.status(400).json({ statusId: 2, message: "Error!!!" }));
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [POST] /bills/changeState
    async changeBillState(req, res, next) {
        const token = req.cookies.token;
        const request = req.body;
        const billID = request.billID;
        const state = request.state;
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
            Bill.findByIdAndUpdate({ _id: billID }, { $set: { state: state } }).then((result) => {
                res.status(200).json({
                    statusId: 0,
                    message: "Correct!!!",
                });
            });
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [POST]  /bills/create
    async createBill(req, res, next) {
        const token = req.cookies.token;
        const customer = JSON.parse(req.cookies.info);
        const customerID = customer.id;
        //Defaul Bill State
        const state = "Waiting to accept";

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECREC);
            console.log(req.body);
            const request = req.body;
            const billValues = request.billValues;
            const total = request.total;
            let cart = request.cart;

            if (
                validator.isAlphanumeric(billValues.name) &&
                validator.isLength(billValues.name, { min: 3, max: 16 }) &&
                validator.isLength(billValues.address, { min: 4, max: 200 }) &&
                validator.isMobilePhone(billValues.phone, "vi-VN")
            ) {
                Customer.findByIdAndUpdate(
                    { _id: customerID },
                    { $set: { name: billValues.name, address: billValues.address, phone: billValues.phone } }
                )
                    .then((result) => console.log("Updated customer successful " + result._id))
                    .catch((error) => console.log(error));
                await Bill.create({ customerID, state, ...billValues, total })
                    .then((result) => {
                        console.log(result);
                        const billID = result._id;
                        cart = cart.map((cartItem) => ({
                            billID,
                            productID: cartItem.id,
                            quantity: cartItem.quantity,
                            price: cartItem.price,
                            subTotal: cartItem.quantity * cartItem.price,
                        }));
                        BillDetail.create(cart)
                            .then((result) => {
                                cart.map((cartItem) => {
                                    Product.findByIdAndUpdate(
                                        { _id: cartItem.productID },
                                        { $inc: { quantity: -cartItem.quantity } }
                                    )
                                        .then((result) =>
                                            console.log("Updated quantity of product successful " + result._id)
                                        )
                                        .catch((error) => console.log(error));
                                });
                                res.status(200).json({
                                    statusId: 0,
                                    message: "Correct!!!",
                                    data: {
                                        ...customer,
                                        name: billValues.name,
                                        address: billValues.address,
                                        phone: billValues.phone,
                                    },
                                });
                            })
                            .catch((error) => res.status(400).json({ statusId: 2, message: "Error!!!" }));
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.status(400).json({ statusId: 2, message: "Error!!!" });
                    });
            } else {
                return res.status(400).json({ statusId: 2, message: "Error!!!" });
            }
        } catch (error) {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }
}

module.exports = new BillsController();
