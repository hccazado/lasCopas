const {body, check,} = require("express-validator");

const validaCampos = [
    check("email").notEmpty().withMessage("Deve Informar o login").bail(),
    check("password").notEmpty().withMessage("Informar senha")
]

module.exports = {
    validaCampos
}