var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");
//importando middleware multer com storages
const middleMulter = require("../middlewares/upload");

//vinculando middleware multer com storage p/rotulos
const upload = middleMulter.uploadRotulo;

//-------------Rotas-------------------------
//index
router.get("/", controller.index);

//get para cadastrar produto
router.get("/cadastro", controller.cadastroProduto);

//declarando rota POST para cadastro de produto, com instancia do multer para salvar o rotulo do vinho
router.post("/cadastro", upload.single("rotulo"), controller.cadastrarProduto)

router.get("/:id", controller.detalhe);

router.post("/editar/:id", upload.single("rotulo"), controller.editarProduto);

module.exports = router;