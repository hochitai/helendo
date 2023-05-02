const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderDetail = new Schema(
    {
        orderID: { type: Schema.Types.ObjectId, ref: "Order" },
        productID: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
        subTotal: { type: Number, require: true },
    },
    {
        collection: "orderDetails",
    }
);

module.exports = mongoose.model("OrderDetail", OrderDetail);
