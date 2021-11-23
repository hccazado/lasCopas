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
        let novoCarrinho = []; //Array para receber nova listagem de produtos comprados com o valor atual
                               //Para realizar insert na tabela item pedido com o valor atual.
        
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
            let novoProduto = {};
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

                novoProduto = {
                    id: vinho.id_produto,
                    quantidade: vinho.qtd,
                    valor: vinho.valor
                }

                novoCarrinho.push(novoProduto);
                
                produtos.push(vinho);
            });
        }).then(_=>{
            req.session.carrinho = novoCarrinho;
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
        carrinho = carrinho.map(item =>{
            let itemMap = {id_produto: item.id,
            quantidade: item.quantidade,
            valor: item.valor
        }
            return itemMap;
        });
        console.log(carrinho);

        var idEndereco = 0;

        let enderecoCliente = await Cliente.findByPk(idCliente, {
            include: {
                model: Endereco,
                attributes: ['id_endereco'],
                as: "enderecos"
            }
        }).then(end =>{
            idEndereco = (end.enderecos[0].id_endereco);
            console.log("ID Endereço: "+idEndereco)
        }).catch(error =>{console.log("Erro Sequelize. Possui endereço?\n" + error)})

        let pedido = await Pedido.create({
            id_endereco: idEndereco,
            id_cliente: idCliente
        }).then(resultado =>{
            for(item of carrinho){
                PedidoProduto.create({
                    id_pedido: resultado.dataValues.id_pedido,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade,
                    valor: item.valor
                }).then(_ =>{
                    req.session.carrinho = [];
                    return res.redirect("/");
                }).catch(err =>{console.log(err)})
            }
        }).catch(err =>{
            console.log("Algo deu errado!\n"+err)
        })

       
    }
}

module.exports = controller;