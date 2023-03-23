const express = require("express");
const router = express.Router();

const BillsController = require("../app/controllers/BillsController");

router.post("/create", BillsController.createBill);
router.get("/:id", BillsController.getByID);
router.get("/", BillsController.getAll);

module.exports = router;
