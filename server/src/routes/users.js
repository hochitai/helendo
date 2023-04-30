const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UsersController");
const AuthMiddleware = require("../app/middlewares/AuthMiddleware");

router.post("/login", usersController.login);
router.get("/", AuthMiddleware, usersController.getAll);

module.exports = router;
