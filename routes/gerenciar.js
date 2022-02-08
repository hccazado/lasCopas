const express = require("express");
const router = express.Router();
const controller = require("../Controllers/gerenciarController");
const clientesController = require("../Controllers/clientesController");
const produtosController = require("../Controllers/produtosController");


//importando middleware multer com storages
const middleMulter = require("../middlewares/upload");

//import do middleware do validator
const validator = require("../middlewares/validator");

//vinculando middleware multer com storage p/rotulos
const uploadRotulo = middleMulter.uploadRotulo;

router.get("/", controller.index);

router.get("/clientes", controller.listarClientes);
router.get("/clientes/buscar/:valor", controller.buscarClientes);
router.get("/produtos/buscar/:valor", controller.buscarProdutos);
router.get("/pedidos/buscar/:valor", controller.buscarPedidos);


router.get("/pedidos", controller.listarPedidos);
router.get("/pedidos/:id", controller.detalhePedido);

router.get("/produtos", controller.listarProdutos);
router.get("/produtos/cadastro", produtosController.cadastroProduto);
router.post("/produtos/cadastro", uploadRotulo.single("rotulo"), validator.validaCamposCadastroProduto, produtosController.cadastrarProduto);
router.get("/produtos/:id", controller.editarProduto);
router.post("/produtos/editar/:id", uploadRotulo.single("rotulo"), validator.validaCamposCadastroProduto, produtosController.editarProduto);


module.exports = router;