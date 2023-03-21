const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bill = new Schema(
    {
        customerID: { type: Schema.Types.ObjectId, ref: "Customer", require: true },
        userID: { type: Schema.Types.ObjectId, ref: "User" },
        state: { type: String, require: true },
        name: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: String, require: true },
        total: { type: Number, require: true },
        notes: { type: String },
    },
    {
        timestamps: true,
        collection: "bills",
    }
);

module.exports = mongoose.model("Bill", Bill);
