const productsRouter = require("./products");
const customersRouter = require("./customers");

function route(app) {
    app.use("/api/products", productsRouter);
    app.use("/api/customers", customersRouter);
}

module.exports = route;
