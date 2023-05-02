const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: "User", require: true },
        name: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: String, require: true },
        total: { type: Number, require: true },
    },
    {
        timestamps: true,
        collection: "orders",
    }
);

module.exports = mongoose.model("Order", Order);
