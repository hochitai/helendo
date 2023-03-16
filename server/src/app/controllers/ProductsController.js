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
        console.log(req.query);
        const request = req.query;
        const limit = parseInt(request.limit);
        const page = request.page;
        const skip = (page - 1) * limit;
        console.log(skip);
        const search = request.search;
        if (search) {
            const cate = search.filter((ele) => ele.type === "cate").map((ele) => ele.id);
            const size = search.filter((ele) => ele.type === "size").map((ele) => ele.id);
            const tag = search.filter((ele) => ele.type === "tag").map((ele) => ele.id);

            const inStock = search.find((ele) => ele.type === "avail" && ele.id === "in-stock")
                ? { quantity: { $gt: 0 } }
                : {};
            const outOfStock = search.find((ele) => ele.type === "avail" && ele.id === "out-of-stock")
                ? { quantity: { $lte: 0 } }
                : {};

            const priceItem = search.find((ele) => ele.type === "price");
            let price = {};
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

            console.log(sortItem.value.replace("sort ", ""));
            if (sortItem) {
                switch (sortItem.value.replace("sort ", "")) {
                    case "popularity":
                        // Set when set up bill
                        sort = {};
                        break;

                    case "latest":
                        // Set when set up bill
                        sort = { updatedDate: -1 };
                        break;

                    case "price (low to high)":
                        // Set when set up bill
                        sort = { price: 1 };
                        break;

                    case "price (high to low)":
                        // Set when set up bill
                        sort = { price: -1 };
                        break;

                    case "default":
                    default:
                        sort = {};
                }
            }

            console.log(request);

            // Product.find({
            //     $or: [{ categoryID: { $in: cate } }, { sizeID: { $in: size } }, { tagID: { $in: tag } }],
            //     $or: [inStock, outOfStock],
            //     price: price,
            // })
            //     .aggregate([{ $count: "totalProduct" }])
            //     .skip(skip)
            //     .limit(limit)
            //     .sort(sort)
            //     .then((product) => res.status(200).json(product))
            //     .catch(next);

            Product.aggregate([
                {
                    $match: {
                        $or: [{ categoryID: { $in: cate } }, { sizeID: { $in: size } }, { tagID: { $in: tag } }],
                        $or: [inStock, outOfStock],
                        price: price,
                    },
                },
                { $sort: sort },
                {
                    $group: {
                        _id: 0,
                        totalProduct: { $sum: 1 },
                        data: { $push: "$$ROOT" },
                    },
                },
                // { $skip: skip },
                // { $limit: limit },
                // { $group: { _id: 1, data: { $push: "$$ROOT" } } },
            ])
                .then((product) => res.status(200).json(product))
                .catch(next);
        }
    }
}

module.exports = new ProductsController();
