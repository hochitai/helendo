const productsRouter = require("./products");
const customersRouter = require("./customers");
const typesRouter = require("./types");
const billsRouter = require("./bills");
const usersRouter = require("./users");

function route(app) {
    app.use("/api/products", productsRouter);
    app.use("/api/customers", customersRouter);
    app.use("/api/types", typesRouter);
    app.use("/api/bills", billsRouter);
    app.use("/api/users", usersRouter);
}

module.exports = route;
