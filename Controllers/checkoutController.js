const session = require("express-session");

const title = "lasCopas - Checkout";

const {Produto, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;

//lista de objetos para testar!
const produtos = [
    {   id: 10,
        rotulo: "/images/uploads/rotulos/EM-roble.png",
        finca: "Estancia Mendoza",
        uvas: "merlot,malbec",
        valor: 79.90,
        qtd: 2,
        total: ()=>this.valor*this.qtd
    },
    {   id: 12,
        rotulo: "/images/uploads/rotulos/Trapiche - cabernet.png",
        finca: "Trapiche",
        uvas: "Suavignon",
        valor: 83.90,
        qtd: 3,
        total: ()=>this.valor*this.qtd
    },
]



const controller = {
    carrinho: (req, res, next) =>{
        var produtosArray = [];
        if(!req.session.carrinho){
            res.render("carrinho", {
                title: title,
                produtos: []
            })
        }

        else{
            let carrinho = req.session.carrinho;
            
            carrinho.forEach(item =>{
                 Produto.findByPk(item.id,{
                    include: [{model: Uva, as:"uvas"}]
                }).then(resultado =>{
                    let uvas = []
                    resultado.uvas.forEach(uva =>{
                        uvas.push(uva.dataValues.nome_uva)
                    });

                    let vinho = {
                        ...resultado.dataValues,
                        qtd: item.quantidade,
                        total: ()=>this.valor*this.qtd,
                        uvas
                    };
                    console.log(vinho);
                    produtosArray.push(vinho);
                    //console.log(produtosArray);
                    res.render("carrinho", {
                        title: title,
                        produtos: produtosArray
                    })
                });
                
            });
        }
        
    },
    pagar: (req, res, next) => {
        res.render("pagamento", {
            title: title
        })
    }
}

module.exports = controller;