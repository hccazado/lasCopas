const express = require("express");
const router = express.Router();
const controller = require("../Controllers/checkoutController");

router.get("/", controller.carrinho);

router.get("/pagar", controller.pagar);

router.get("/confirmarPagamento", controller.confirmar);

module.exports = router;