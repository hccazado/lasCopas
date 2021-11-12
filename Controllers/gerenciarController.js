//Require dos controladores

const produtosController = require("./produtosController");
const produtosModel = require("../model/produtosModel");
const {Produto, Uva} = require("../models");
const loginController = require("./loginController");
//const clientesModel = require("../model/clientesModel");

//Titulo das paginas
const title = "lasCopas - Administração";

const pedidos = [
    {
        nro: 0012021,
        nome: "zé das couve",
        doc: "02234567890"
    },
    {
        nro: 0022021,
        nome: "zé do leite",
        doc: "04567878902"
    }
]

//Objeto com os metodos do controller a serem exportados
const controller = {
    index: (req, res, next) => {
        res.render("painelAdministrativo", {
            title: title
        });
    },
    listarClientes: (req, res, next) => {
        res.render("listaClientes", {
            title: title,
            clientes: []
        });
    },
    listarPedidos: (req, res, next) => {
        res.render("listaPedidos", {
            title: title,
            pedidos: pedidos
        });
    },
    listarProdutos: async (req, res, next) => {
        //Carregando lista de todos produtos do controller de produtos
        let produtos = [];
        let items = await Produto.findAll({
            include: {
                model: Uva,
                as: "uvas"
            }
        }).then(resultado =>{
            let vinho = {};
            resultado.forEach(atual =>{
                let uvas = [];
                atual.uvas.forEach(uva=>{
                    uvas.push(uva.nome_uva);
                });
                let vinho = {
                    ...atual.dataValues,
                    uvas
                }
                produtos.push(vinho);
            })
        })
        return res.render("listaProdutos", {
            title: title,
            produtos: produtos
        });
    },
    formCadastroCliente: (req, res, next) => {
        res.render("cadastroCliente", {
            title: title,
            exists: false,
            errors: {},
            id: null,
            isEditing: false,
            cliente: {},
            old: {}
        });
    },
    //Metodo para chamar o model Cliente e recuperar os dados respectivos do ID e enviar os mesmos a view.
    edicaoCliente: (req, res, next) =>{
        let id = req.params.id;
        //let resultado = clientesModel.buscarClienteID(id);
        //console.log(resultado);
        res.render("cadastroCliente", {
            title: title,
            exists: false,
            errors: [],
            id: id,
            isEditing: true,
            cliente: [],
            old: {} 
        })
    },
    editarProduto: async (req, res, next) => {
        let id = req.params.id;
        let dadosProduto = await Produto.findByPk(id,{
            include:{model: Uva, as:"uvas"}
        }).then(resultado =>{
            let uvas = [];
            resultado.dataValues.uvas.forEach(uva =>{
                uvas.push(uva.id_uva);
            });
            let vinho ={
                ...resultado.dataValues,
                uvas
            }

            res.render("cadastroProduto", {
                title: title,
                id: id,
                produto: vinho,
                isEditing: true,
                errors: {}
            });
        })
        //console.log(dadosProduto.dataValues);
        /*res.render("cadastroProduto", {
            title: title,
            id: id,
            produto: dadosProduto,
            isEditing: true,
            errors: {}
        });*/
    }
};

module.exports = controller;