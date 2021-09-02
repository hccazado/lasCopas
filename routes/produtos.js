var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");

router.get("/", controller.index);

module.exports = router;