const express = require("express");
const router = express.Router();
const controller = require("../Controllers/gerenciarController");

router.get("/", controller.index);

router.get("/clientes", controller.listarClientes);

router.get("/pedidos", controller.listarPedidos);

router.get("/produtos", controller.listarProdutos);

module.exports = router;