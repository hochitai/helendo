const Product = require("../models/Product");

class ProductsControll {
    // [GET] products
    index(req, res, next) {
        Product.find({})
            .then((products) => res.json(products))
            .catch(next);
    }
}

module.exports = new ProductsControll();
