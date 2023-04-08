const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Resource = new Schema(
    {
        id: { type: Number, require: true },
        name: { type: String, required: true },
    },
    {
        collection: "resources",
    }
);

module.exports = mongoose.model("Resource", Resource);
