var express = require("express");
var router = express.Router();
const controller = require("../Controllers/produtosController");
const path = require("path");

//importando multer para gerenciar imagem de rotulo
const multer = require("multer"); 

//Definindo local a salvar os rotulos e nome das imagens.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads/rotulos");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"-"+Date.now()+"-"+path.extname(file.originalname));
    }
});

//instanciando middleware do multer com definições do diskstorage
const upload = multer({storage:storage});


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