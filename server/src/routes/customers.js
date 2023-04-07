const express = require("express");
const router = express.Router();

const customersController = require("../app/controllers/CustomersController");

router.post("/register", customersController.register);
router.post("/login", customersController.login);
router.post("/updateInfo", customersController.updateInfomation);
router.post("/changePassword", customersController.changePassword);

module.exports = router;
