const Product = require("../models/Product");

class ProductsControll {
    // [GET] products
    index(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        Product.find({})
            .then((products) => res.json(products))
            .catch(next);
    }

    // [GET] /products/:slug
    show(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        Product.findOne({ slug: req.params.slug })
            .then((product) => res.json(product))
            .catch(next);
    }
}

module.exports = new ProductsControll();
