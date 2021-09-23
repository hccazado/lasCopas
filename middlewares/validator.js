const {body, check,} = require("express-validator");

const validaCamposLogin = [
    check("email").notEmpty().withMessage("Deve Informar o login").bail(),
    check("password").notEmpty().withMessage("Informar senha")
];

const validaCamposCadastroCliente = [
    check("nome").notEmpty().withMessage("Informar nome para cadastro").bail().isLength({min:6}).withMessage("Nome deve ser maior que 6 caracteres"),
    check("nascimento").notEmpty().withMessage("Informar data de nascimento valida").bail(),
    check("email").notEmpty().withMessage("Informar email").bail().isEmail().withMessage("Informar Email valido"),
    check("password").notEmpty().withMessage("Informar senha de acesso").bail().isLength({min:6}).withMessage("pelo menos 6 caracteres"),
    check("pessoa").notEmpty().withMessage("Informar tipo de cadastro"),
    check("doc").notEmpty().withMessage("Informar documento"),
    check("cep").notEmpty().withMessage("Informar CEP"),
    check("end1").notEmpty().withMessage("Informar endereço"),
    check("uf").notEmpty().withMessage("Selecionar Estado"),
    check("cidade").notEmpty().withMessage("Informe cidade")
];

module.exports = {
    validaCamposLogin,
    validaCamposCadastroCliente
}