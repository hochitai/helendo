const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tag = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        collection: "tags",
    }
);

module.exports = mongoose.model("Tag", Tag);
