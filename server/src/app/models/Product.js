const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: { type: String, default: "hahaha" },
});

module.exports = mongoose.model("Product", Product);
