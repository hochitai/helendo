const express = require("express");
const router = express.Router();

const customersController = require("../app/controllers/CustomersController");
const AuthMiddleware = require("../app/middlewares/AuthMiddleware");

router.post("/register", customersController.register);
router.post("/login", customersController.login);
router.post("/updateInfo", AuthMiddleware, customersController.updateInfomation);
router.post("/changePassword", AuthMiddleware, customersController.changePassword);
router.get("/", AuthMiddleware, customersController.getAll);

module.exports = router;
