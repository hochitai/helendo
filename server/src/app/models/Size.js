const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Size = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        collection: "sizes",
    }
);

module.exports = mongoose.model("Size", Size);
