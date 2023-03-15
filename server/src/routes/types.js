const express = require("express");
const router = express.Router();

const typesController = require("../app/controllers/TypesController");

router.get("/", typesController.getAll);

module.exports = router;
