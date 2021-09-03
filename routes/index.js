var express = require('express');
var router = express.Router();
var controller = require("../Controllers/indexController");

/* GET home page. */
router.get('/', controller.index);
router.get("/envio", controller.envio);
router.get("/gerenciar/",controller.gerenciar);

module.exports = router;
