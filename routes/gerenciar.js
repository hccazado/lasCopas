const express = require("express");
const router = express.Router();
const controller = require("../Controllers/gerenciarController");
const clientesController = require("../Controllers/clientesController");
const produtosController = require("../Controllers/produtosController");

//importando middleware multer com storages
const middleMulter = require("../middlewares/upload");

//import do middleware do validator
const validator = require("../middlewares/validator");

//import middleware autenticador
const authenticator = require("../middlewares/authenticator");

//vinculando middleware multer com storage p/rotulos
const uploadRotulo = middleMulter.uploadRotulo;

router.get("/", authenticator.autenticaLogin, controller.index);

router.get("/clientes", authenticator.autenticaLogin, controller.listarClientes);

router.get("/pedidos", authenticator.autenticaLogin, controller.listarPedidos);

router.get("/produtos", authenticator.autenticaLogin, controller.listarProdutos);
router.get("/produtos/cadastro", authenticator.autenticaLogin, produtosController.cadastroProduto);
router.post("/produtos/cadastro", authenticator.autenticaLogin, uploadRotulo.single("rotulo"), validator.validaCamposCadastroProduto, produtosController.cadastrarProduto);
router.get("/produtos/:id", authenticator.autenticaLogin, controller.editarProduto);
router.post("/produtos/editar/:id", authenticator.autenticaLogin, uploadRotulo.single("rotulo"), validator.validaCamposCadastroProduto, produtosController.editarProduto);

router.get("/cadastrocliente", controller.formCadastroCliente);
router.post("/cadastrocliente", validator.validaCamposCadastroCliente, clientesController.cadastrar);
router.get("/cliente/:id", controller.edicaoCliente);
router.post("/cliente/:id", validator.validaCamposCadastroCliente, clientesController.editar);

module.exports = router;