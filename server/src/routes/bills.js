const express = require("express");
const router = express.Router();

const BillsController = require("../app/controllers/BillsController");

router.post("/create", BillsController.createBill);

module.exports = router;
