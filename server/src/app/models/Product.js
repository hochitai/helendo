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
        quantity: { type: Number, default: 0 },
        feeling: {
            type: String,
            default: "At vero accusamus et iusto odio dignissimos blanditiis praesentiums dolores molest.",
        },
        description: {
            type: String,
            default:
                "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum omnis voluptas assumenda.",
        },
        features: {
            type: String,
            default:
                "Fully padded back panel, web hauded handle;Internal padded sleeve fits 15″ laptop;Internal tricot lined tablet sleeve;One large main compartment and zippered;Premium cotton canvas fabric",
        },
        dimensions: { type: String, default: "12 x 2 x 1.5 cm" },
        weight: { type: Number, default: 1.2 },
        image: {
            type: String,
            default: "https://helendo.jamstacktemplates.dev/images/products/animi-dolor-pariatur/585x585.jpg",
        },
        state: { type: Boolean, default: true },
        slug: {
            type: String,
            slug: "name",
        },
    },
    {
        timestamps: true,
        colletion: "products",
    }
);

module.exports = mongoose.model("Product", Product);
