const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        tagID: { type: String },
        categoryID: { type: String },
        sizeID: { type: String },
        saleID: { type: String },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        feeling: { type: String, required: true },
        description: { type: String, required: true },
        features: { type: String, required: true },
        dimensions: { type: String, default: "12 x 2 x 1.5 cm" },
        weight: { type: Number, default: 1.2 },
        image: {
            type: String,
            default: "https://helendo.jamstacktemplates.dev/images/products/animi-dolor-pariatur/585x585.jpg",
        },
        state: { type: Boolean, default: true },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", Product);
