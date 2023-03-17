const Product = require("../models/Product");

class ProductsController {
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

    // [GET] /products/search
    async search(req, res, next) {
        const request = req.query;
        const limit = parseInt(request.limit);
        const page = request.page;
        const skip = (page - 1) * limit;
        const search = request.search;
        let totalProduct = 0;
        if (search) {
            const cate = search.filter((ele) => ele.type === "cate").map((ele) => ele.id);
            const size = search.filter((ele) => ele.type === "size").map((ele) => ele.id);
            const tag = search.filter((ele) => ele.type === "tag").map((ele) => ele.id);

            const groupCate = [];

            if (cate.length > 0) {
                groupCate.push({ categoryID: { $in: cate } });
            }

            if (size.length > 0) {
                groupCate.push({ sizeID: { $in: size } });
            }

            if (tag.length > 0) {
                groupCate.push({ tagID: { $in: tag } });
            }

            const inStock = search.find((ele) => ele.type === "avail" && ele.id === "in-stock")
                ? { quantity: { $gt: 0 } }
                : {};
            const outOfStock = search.find((ele) => ele.type === "avail" && ele.id === "out-of-stock")
                ? { quantity: { $lte: 0 } }
                : {};

            const priceItem = search.find((ele) => ele.type === "price");
            let price = { $gte: 0 };
            if (priceItem) {
                if (priceItem.value.priceFrom && priceItem.value.priceTo) {
                    price = { $gte: parseInt(priceItem.value.priceFrom), $lte: parseInt(priceItem.value.priceTo) };
                } else {
                    if (priceItem.value.priceFrom) {
                        price = { $gte: parseInt(priceItem.value.priceFrom) };
                    }
                    if (priceItem.value.priceTo) {
                        price = { $lte: parseInt(priceItem.value.priceTo) };
                    }
                }
            }

            const sortItem = search.find((ele) => ele.type === "sort");
            let sort = {};
            if (sortItem) {
                switch (sortItem.value.replace("sort ", "")) {
                    case "popularity":
                        // Set when set up bill
                        sort = {};
                        break;

                    case "latest":
                        sort = { updatedDate: -1 };
                        break;

                    case "price (low to high)":
                        sort = { price: 1 };
                        break;

                    case "price (high to low)":
                        sort = { price: -1 };
                        break;

                    case "default":
                    default:
                        sort = {};
                }
            }
            const nameItem = search.find((ele) => ele.type === "name");
            let name = "";
            if (nameItem) {
                name = nameItem.value;
            }

            await Product.find({
                $and: [
                    { $or: groupCate },
                    { $or: [inStock, outOfStock] },
                    { price: price },
                    { name: { $regex: name, $options: "i" } },
                ],
            })
                .then((product) => {
                    totalProduct = product.length;
                })
                .catch(next);

            await Product.find({
                $and: [
                    { $or: groupCate },
                    { $or: [inStock, outOfStock] },
                    { price: price },
                    { name: { $regex: name, $options: "i" } },
                ],
            })
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .then((product) => res.status(200).json({ totalProduct, data: product }))
                .catch(next);
        } else {
            await Product.find({})
                .then((product) => {
                    totalProduct = product.length;
                })
                .catch(next);
            await Product.find({})
                .skip(skip)
                .limit(limit)
                .then((product) => {
                    res.status(200).json({ totalProduct, data: product });
                })
                .catch(next);
        }
    }
}

module.exports = new ProductsController();
