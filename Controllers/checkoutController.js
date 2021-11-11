const session = require("express-session");
const { Result } = require("express-validator");

const title = "lasCopas - Checkout";

const { Produto, Uva, sequelize, Sequelize } = require('../models');
const Op = Sequelize.Op;

//lista de objetos para testar!
var produtos = [
    {
        id: 10,
        rotulo: "/images/uploads/rotulos/EM-roble.png",
        finca: "Estancia Mendoza",
        uvas: "merlot,malbec",
        valor: 79.90,
        qtd: 2,
        total: () => this.valor * this.qtd
    },
    {
        id: 12,
        rotulo: "/images/uploads/rotulos/Trapiche - cabernet.png",
        finca: "Trapiche",
        uvas: "Suavignon",
        valor: 83.90,
        qtd: 3,
        total: () => this.valor * this.qtd
    },
]



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
        produtos = [];
        
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
            include: [Uva]
        }).then(resultado => {
            let vinho = {};
            resultado.forEach(atual =>{
                let uvas = [];
                atual.Uvas.forEach(uva =>{
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