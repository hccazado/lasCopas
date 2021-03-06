const {body, check,} = require("express-validator");
const {Login, Cliente, Endereco, sequelize, Sequelize} = require('../models');

const validaCamposLogin = [
    check("email").notEmpty().withMessage("Deve Informar o login").bail().isEmail().withMessage("Email invalido!"),
    check("password").notEmpty().withMessage("Informar senha")
];

const validaCamposCadastroCliente = [
    check("nome").trim().notEmpty().withMessage("Informar nome para cadastro").bail().isLength({min:4}).withMessage("Nome deve ser maior que 4 caracteres"),
    check("nascimento").notEmpty().withMessage("Informar data de nascimento valida").bail(),
    check("email").trim().notEmpty().withMessage("Informar email").bail().isEmail().withMessage("Informar Email valido"),
    /*.custom(async (emailBody) => {
        const procuraEmail = await Login.findOne({
            where: {
                email: emailBody,
            },
        });
        if (!procuraEmail) {
            return emailBody;
        }
        if (procuraEmail.email) {
            return Promise.reject("Email já está em uso!");
        }
    }),*/
    check("password").trim().notEmpty().withMessage("Informar Senha de Login").bail().isLength({min:6}).withMessage("pelo menos 6 caracteres"),
    check("pessoa").notEmpty().withMessage("Informar Tipo de Cadastro"),
    check("doc").trim().notEmpty().withMessage("Informar Documento"),
    check("cep").trim().notEmpty().withMessage("Informar CEP"),
    check("end1").trim().notEmpty().withMessage("Informar Endereço"),
    check("bairro").trim().notEmpty().withMessage("Informar Bairro"),
    check("uf").notEmpty().withMessage("Selecionar Estado"),
    check("cidade").trim().notEmpty().withMessage("Informe Cidade")
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