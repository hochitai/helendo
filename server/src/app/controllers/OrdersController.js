require("dotenv").config();
const validator = require("validator");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");

class OrdersControlller {
    // [GET] /orders/all
    async getAll(req, res, next) {
        const user = req.cookies.resource;
        if (user) {
            await Order.aggregate([
                {
                    $lookup: {
                        from: "orderDetails",
                        let: { orderID: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$orderID", "$$orderID"] } } },
                            {
                                $lookup: {
                                    from: "products",
                                    let: {
                                        productID: "$productID",
                                    },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$productID"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "productDetail",
                                },
                            },
                        ],
                        as: "orderDetail",
                    },
                },
            ])
                .then((result) => res.status(200).json(result))
                .catch(() => res.status(200).json({ statusId: 2, message: "Error!!!" }));
        } else {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }

    // [GET] /orders
    async getByID(req, res, next) {
        // const mongoose = require("mongoose");
        // const customer = JSON.parse(req.cookies.info);
        // const customerID = customer.id;
        // await Bill.aggregate([
        //     {
        //         $match: {
        //             customerID: new mongoose.Types.ObjectId(customerID),
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: "billDetails",
        //             let: { billID: "$_id" },
        //             pipeline: [
        //                 { $match: { $expr: { $eq: ["$billID", "$$billID"] } } },
        //                 {
        //                     $lookup: {
        //                         from: "products",
        //                         let: {
        //                             productID: "$productID",
        //                         },
        //                         pipeline: [
        //                             {
        //                                 $match: {
        //                                     $expr: {
        //                                         $eq: ["$_id", "$$productID"],
        //                                     },
        //                                 },
        //                             },
        //                         ],
        //                         as: "productDetail",
        //                     },
        //                 },
        //             ],
        //             as: "billDetail",
        //         },
        //     },
        // ])
        //     .then((result) => res.status(200).json(result))
        //     .catch(() => res.status(200).json({ statusId: 2, message: "Error!!!" }));
    }

    // [POST]  /orders/create
    async createBill(req, res, next) {
        const auth = req.cookies.resource;
        if (auth) {
            const user = JSON.parse(req.cookies.info);
            const userID = user.id;
            const name = req.body.name;
            const address = req.body.address;
            const phone = req.body.phone;
            let products = req.body.products;

            const total = products.reduce(
                (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
                0
            );

            if (
                validator.isLength(name, { min: 3, max: 16 }) &&
                validator.isLength(address, { min: 4, max: 200 }) &&
                validator.isMobilePhone(phone, "vi-VN")
            ) {
                await Order.create({ userID, name, address, phone, total })
                    .then((result) => {
                        console.log(result);
                        const orderID = result._id;
                        products = products.map((item) => ({
                            orderID,
                            productID: item.id,
                            quantity: item.quantity,
                            price: item.price,
                            subTotal: item.quantity * item.price,
                        }));
                        OrderDetail.create(products)
                            .then((result) => {
                                products.map((item) => {
                                    Product.findByIdAndUpdate(
                                        { _id: item.productID },
                                        { $inc: { quantity: item.quantity } }
                                    )
                                        .then((result) =>
                                            console.log("Updated quantity of product successful " + result._id)
                                        )
                                        .catch((error) => console.log(error));
                                });
                                res.status(200).json({
                                    statusId: 0,
                                    message: "Correct!!!",
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
        } else {
            return res.status(400).json({ statusId: 2, message: "Error!!!" });
        }
    }
}

module.exports = new OrdersControlller();
