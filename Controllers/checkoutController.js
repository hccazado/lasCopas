const session = require("express-session");
const { Result } = require("express-validator");
const { locals } = require("../app");

const title = "lasCopas - Checkout";

const { Produto, Uva, Cliente, Pedido, Endereco, PedidoProduto, sequelize, Sequelize } = require('../models');
const Op = Sequelize.Op;


const controller = {
    carrinho: (req, res, next) => {
        //varifica se ja foi criado o atributo carrinho na session
        if (!req.session.carrinho) {
            return res.render("carrinho", {
                title: title,
                produtos: []
            })
        }
        //Ação padrão, há produtos no carrinho da session
        let carrinho = req.session.carrinho;
        let produtos = [];
        
        let listaId = [];
        for (valor of carrinho) {
            listaId.push(valor.id);
        }
        Produto.findAll({
            where: {
                id_produto: {
                    [Op.in]: listaId
                }
            },
            include: {model: Uva, as: "uvas"}
        }).then(resultado => {
            let vinho = {};
            resultado.forEach(atual =>{
                let uvas = [];
                atual.uvas.forEach(uva =>{
                    uvas.push(uva.nome_uva);
                })
                let quantidade =0;
                for(aux of carrinho){
                    if(aux.id == atual.dataValues.id_produto){
                        quantidade = aux.quantidade;
                    }
                }
                vinho = {
                    ...atual.dataValues,
                    qtd: quantidade,
                    uvas: uvas,
                    total: ()=> this.valor*this.qtd
                }
                
                produtos.push(vinho);
            });
        }).then(_=>{
            res.render("carrinho", {
                title: title,
                produtos: produtos
            })
        })

    },
    pagar: (req, res, next) => {
        if(!req.session.user){
            return res.render("login",{
                title: title,
                created: false,
                error: [],
                errorModel: "Necessario entrar para comprar!",
                old: []
            });
        }
        
        res.render("pagamento", {
            title: title
        })
    },
    confirmar: async (req, res, next) =>{
        let {idCliente} = req.session.user;

        let carrinho = req.session.carrinho;
        let listaIdProdutos = [];
        for (valor of carrinho) {
            listaIdProdutos.push(valor.id);
        }

        let enderecoCliente = await Cliente.findByPk(idCliente, {
            include: {
                model: Endereco,
                attributes: ['id_endereco'],
                as: "enderecos"
            }
        })
        let idEndereco = (enderecoCliente.enderecos[0].id_endereco)

        let produtosComprados = Produto.findAll({
            where: {
                id_produto: {
                    [Op.in]:listaIdProdutos
                }
            },
            attributes: ['id_produto','valor']
        }).then(resultado =>{
            console.log(resultado.dataValues);
        })

        console.log(produtosComprados)
        //let novoPedido = await Pedido
    }
}

module.exports = controller;