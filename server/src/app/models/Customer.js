const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        userName: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        avatar: { type: String, default: "https://toigingiuvedep.vn/wp-content/uploads/2022/04/avatar-gau-1.jpg" },
        addressID: { type: String },
    },
    {
        collection: "customers",
    }
);

module.exports = mongoose.model("Customer", Customer);
