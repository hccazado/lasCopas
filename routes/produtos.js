var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");
const controllerCarrinho = require('../Controllers/carrinhoController');

//-------------Rotas-------------------------
//index
router.get("/", controller.index);
router.get("/:tipo", controller.indexFiltro);

//get para cadastrar produto
//router.get("/cadastro", controller.cadastroProduto);

//declarando rota POST para cadastro de produto, com instancia do multer para salvar o rotulo do vinho
//router.post("/cadastro", upload.single("rotulo"), controller.cadastrarProduto)

router.get("/:id", controller.detalhe);
router.post("/adicionar/:id", controllerCarrinho.addItem);


//router.post("/editar/:id", upload.single("rotulo"), controller.editarProduto);

module.exports = router;