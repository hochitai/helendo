const express = require("express");
const router = express.Router();

const customersController = require("../app/controllers/CustomersController");

router.post("/register", customersController.register);
router.post("/login", customersController.login);

module.exports = router;
