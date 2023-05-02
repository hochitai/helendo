const express = require("express");
const router = express.Router();

const OrdersController = require("../app/controllers/OrdersController");
const AuthMiddleware = require("../app/middlewares/AuthMiddleware");

router.post("/create", AuthMiddleware, OrdersController.createBill);
router.get("/all", AuthMiddleware, OrdersController.getAll);
// router.get("/", AuthMiddleware, OrdersController.getByID);

module.exports = router;
