const express = require("express");
const router = express.Router();

const typesController = require("../app/controllers/TypesController");

router.get("/cate/search", typesController.searchCate);
router.get("/size/search", typesController.searchSize);
router.get("/tag/search", typesController.searchTag);
router.get("/", typesController.getAll);

module.exports = router;
