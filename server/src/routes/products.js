const express = require("express");
const router = express.Router();

const productsController = require("../app/controllers/ProductsController");

router.get("/search", productsController.search);
router.post("/create", productsController.create);
router.post("/update", productsController.update);
router.get("/:slug", productsController.getBySlug);
router.get("/", productsController.getAll);

module.exports = router;
