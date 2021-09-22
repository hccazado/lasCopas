var express = require("express");
var router = express.Router();
const controller = require("../Controllers/loginController");

//require middleware validator para campos login
const validarLogin = require("../middlewares/login");

router.get("/", controller.index);

router.post("/", validarLogin.validaCampos, controller.logar);

module.exports = router;