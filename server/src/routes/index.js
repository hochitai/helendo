const productsRouter = require("./products");

function route(app) {
    app.use("/api/products", productsRouter);
}

module.exports = route;
