const express = require("express");
const router = express.Router();
const controller = require("../Controllers/clientesController");
const validator = require("../middlewares/validator");

router.get("/cadastrar", controller.formCadastrarCliente);

router.post("/cadastrar", validator.validaCamposCadastroCliente, controller.cadastrar);

router.get("/editar/:id", controller.formEditarCliente);

router.post("/editar/:id", validator.validaCamposCadastroCliente, controller.editar);


module.exports = router;