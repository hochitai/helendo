const express = require("express");
const router = express.Router();

const BillsController = require("../app/controllers/BillsController");

router.post("/create", BillsController.createBill);
router.post("/changeState", BillsController.changeBillState);
router.get("/all", BillsController.getAll);
router.get("/state", BillsController.getBillByState);
router.get("/:customerID/:id", BillsController.getDetailByIDofCustomer);
router.get("/:id", BillsController.getDetailByID);
router.get("/", BillsController.getByID);

module.exports = router;
