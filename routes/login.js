var express = require("express");
var router = express.Router();
const controller = require("../Controllers/loginController");

//require middleware validator para campos login
const validator = require("../middlewares/validator");

router.get("/", controller.index);

router.post("/", validator.validaCamposLogin, controller.logar);

module.exports = router;