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

        const totalProductInStock = await Product.find({ quantity: { $gt: 0 } }).count();
        const totalProductOutOfStock = await Product.find({ quantity: { $lte: 0 } }).count();

        types.totalProductInStock = totalProductInStock;
        types.totalProductOutOfStock = totalProductOutOfStock;

        res.status(200).json(types);
    }

    async searchCate(req, res, next) {
        const id = req.query.id;
        console.log(req.query);
        await Category.findOne({ _id: id })
            .then((cate) => res.status(200).json(cate))
            .catch(next);
    }

    async searchSize(req, res, next) {
        const id = req.query.id;
        await Size.findOne({ _id: id })
            .then((size) => res.status(200).json(size))
            .catch(next);
    }

    async searchTag(req, res, next) {
        const id = req.query.id;
        console.log(id);
        await Tag.findOne({ _id: id })
            .then((tag) => res.status(200).json(tag))
            .catch(next);
    }
}

module.exports = new TypesController();
