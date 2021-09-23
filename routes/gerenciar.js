const express = require("express");
const router = express.Router();
const controller = require("../Controllers/gerenciarController");
const clientesController = require("../Controllers/clientesController");
const validator = require("../middlewares/validator");

router.get("/", controller.index);

router.get("/clientes", controller.listarClientes);

router.get("/pedidos", controller.listarPedidos);

router.get("/produtos", controller.listarProdutos);
router.get("/produtos/:id",controller.editarProduto);

router.get("/cadastrocliente", controller.formCadastroCliente);
router.post("/cadastrocliente", validator.validaCamposCadastroCliente, clientesController.cadastrar);
router.get("/cliente/:id", controller.edicaoCliente);
router.post("/cliente/:id", validator.validaCamposCadastroCliente, clientesController.editar);

module.exports = router;