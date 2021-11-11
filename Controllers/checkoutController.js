const session = require("express-session");
const { Result } = require("express-validator");

const title = "lasCopas - Checkout";

const { Produto, Uva, sequelize, Sequelize } = require('../models');
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
            //console.log(produtos);
        }).then(_=>{
            res.render("carrinho", {
                title: title,
                produtos: produtos
            })
        })

    },
    pagar: (req, res, next) => {
        res.render("pagamento", {
            title: title
        })
    }
}

module.exports = controller;