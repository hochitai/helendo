const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BillDetail = new Schema(
    {
        billID: { type: Schema.Types.ObjectId, ref: "Bill" },
        productID: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
        subTotal: { type: Number, require: true },
    },
    {
        collection: "billDetails",
    }
);

module.exports = mongoose.model("BillDetail", BillDetail);
