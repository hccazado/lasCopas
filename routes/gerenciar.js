const express = require("express");
const router = express.Router();
const controller = require("../Controllers/gerenciarController");

router.get("/", controller.index);
router.get("/clientes", controller.listaClientes);
router.get("/pedidos", controller.listarPedidos);

module.exports = router;