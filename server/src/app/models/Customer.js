const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        userName: { type: String, required: true },
        passWord: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        addressID: { type: String },
    },
    {
        collection: "customers",
    }
);

module.exports = mongoose.model("Customer", Customer);
