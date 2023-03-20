const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BillState = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        collection: "billStates",
    }
);

module.exports = mongoose.model("BillState", BillState);
