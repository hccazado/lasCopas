const {body, check,} = require("express-validator");

const validaCamposLogin = [
    check("email").notEmpty().withMessage("Deve Informar o login").bail(),
    check("password").notEmpty().withMessage("Informar senha")
];

const validaCamposCadastroCliente = [
    check("nome").trim().notEmpty().withMessage("Informar nome para cadastro").bail().isLength({min:4}).withMessage("Nome deve ser maior que 6 caracteres"),
    check("nascimento").notEmpty().withMessage("Informar data de nascimento valida").bail(),
    check("email").trim().notEmpty().withMessage("Informar email").bail().isEmail().withMessage("Informar Email valido"),
    check("password").trim().notEmpty().withMessage("Informar senha de acesso").bail().isLength({min:6}).withMessage("pelo menos 6 caracteres"),
    check("pessoa").notEmpty().withMessage("Informar tipo de cadastro"),
    check("doc").trim().notEmpty().withMessage("Informar documento"),
    check("cep").trim().notEmpty().withMessage("Informar CEP"),
    check("end1").trim().notEmpty().withMessage("Informar endereço"),
    check("uf").notEmpty().withMessage("Selecionar Estado"),
    check("cidade").trim().notEmpty().withMessage("Informe cidade")
];

const validaCamposCadastroProduto = [
    check("finca").notEmpty().withMessage("deve informar bodega"),
    check("ano").notEmpty().withMessage("Deve informar Ano de produção do vinho"),
    check("preco").notEmpty().withMessage("Deve informar preço do vinho"),
    check("origem").notEmpty().withMessage("Deve selecionar a origem do vinho")
]

module.exports = {
    validaCamposLogin,
    validaCamposCadastroCliente,
    validaCamposCadastroProduto
}