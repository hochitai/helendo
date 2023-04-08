const express = require("express");
const router = express.Router();

const BillsController = require("../app/controllers/BillsController");

router.post("/create", BillsController.createBill);
router.get("/:id", BillsController.getDetailByID);
router.get("/", BillsController.getByID);

module.exports = router;
