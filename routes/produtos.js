var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");

router.get("/", controller.index);

router.get("/cadastro", controller.cadastro);

module.exports = router;