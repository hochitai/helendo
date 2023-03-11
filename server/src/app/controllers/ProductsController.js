const Product = require("../models/Product");

class ProductsControll {
    // [GET] products
    async getAll(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        await Product.find({})
            .then((products) => res.json(products))
            .catch(next);
    }

    // [GET] /products/:slug
    async getBySlug(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        await Product.findOne({ slug: req.params.slug })
            .then((product) => res.json(product))
            .catch(next);
    }
}

module.exports = new ProductsControll();
