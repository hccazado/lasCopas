var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");

router.get("/", controller.index);

router.get("/cadastro", controller.cadastro);

router.get("/detalhe", controller.detalhe);

module.exports = router;