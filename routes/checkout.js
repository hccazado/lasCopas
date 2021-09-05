const express = require("express");
const router = express.Router();
const controller = require("../Controllers/checkoutController");

router.get("/", controller.carrinho);

module.exports = router;