const Product = require("../models/Product");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const Size = require("../models/Size");

class TypesController {
    // [GET] cate, tag, size, count product
    async getAll(req, res, next) {
        const types = {};
        await Category.find({})
            .then((cates) => (types.cate = cates))
            .catch(next);

        await Size.find({})
            .then((sizes) => (types.size = sizes))
            .catch(next);

        await Tag.find({})
            .then((tags) => (types.tag = tags))
            .catch(next);

        const totalProductInStock = await Product.find({ quantity: { $lte: 0 } }).count();
        const totalProductOutOfStock = await Product.find({ quantity: { $gt: 0 } }).count();

        types.totalProductInStock = totalProductInStock;
        types.totalProductOutOfStock = totalProductOutOfStock;

        res.status(200).json(types);
    }
}

module.exports = new TypesController();
