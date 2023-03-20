const productsRouter = require("./products");
const customersRouter = require("./customers");
const typesRouter = require("./types");
const billsRouter = require("./bills");

function route(app) {
    app.use("/api/products", productsRouter);
    app.use("/api/customers", customersRouter);
    app.use("/api/types", typesRouter);
    app.use("/api/bills", billsRouter);
}

module.exports = route;
