const express = require("express");
const router = express.Router();

const productsController = require("../app/controllers/ProductsController");

router.get("/", productsController.getAll);
router.get("/:slug", productsController.getBySlug);

module.exports = router;
