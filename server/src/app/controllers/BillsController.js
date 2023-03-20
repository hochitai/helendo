const Bill = require("../models/Bill");

class BillsController {
    // [POST] create Bill
    async createBill(req, res, next) {
        console.log(req.cookies);
    }
}

module.exports = new BillsController();
