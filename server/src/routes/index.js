const productsRouter = require("./products");
const customersRouter = require("./customers");
const typesRouter = require("./types");

function route(app) {
    app.use("/api/products", productsRouter);
    app.use("/api/customers", customersRouter);
    app.use("/api/types", typesRouter);
}

module.exports = route;
