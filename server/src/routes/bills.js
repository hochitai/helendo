const express = require("express");
const router = express.Router();

const BillsController = require("../app/controllers/BillsController");
const AuthMiddleware = require("../app/middlewares/AuthMiddleware");

router.post("/create", AuthMiddleware, BillsController.createBill);
router.post("/changeState", AuthMiddleware, BillsController.changeBillState);
router.get("/statistic", AuthMiddleware, BillsController.getStatisticOfYear);
router.get("/all", AuthMiddleware, BillsController.getAll);
router.get("/state", AuthMiddleware, BillsController.getBillByState);
router.get("/:customerID/:id", AuthMiddleware, BillsController.getDetailByIDofCustomer);
router.get("/:id", AuthMiddleware, BillsController.getDetailByID);
router.get("/", AuthMiddleware, BillsController.getByID);

module.exports = router;
