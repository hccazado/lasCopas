const session = require("express-session");
const { Result } = require("express-validator");

const title = "lasCopas - Checkout";

const {Produto, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;

//lista de objetos para testar!
var produtos = [
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
        
        if(!req.session.carrinho){
            res.render("carrinho", {
                title: title,
                produtos: []
            })
        }

        else{
            let carrinho = req.session.carrinho;
            produtos = [];
            /*carrinho.forEach(item =>{
                let resultado = Produto.findByPk(item.id,{
                    include: Uva
                }).then(resultado =>{
                    let vinho = {...resultado.dataValues,
                        qtd: item.quantidade,
                        total: ()=>this.valor*this.qtd
                    };
                    let uvas = [];
                    resultado.Uvas.forEach(uva=>{
                        uvas.push(uva.dataValues.nome_uva);
                    });
                    vinho = {
                        ...vinho,
                        uvas
                    };

                    produtosArray.push(vinho);
                    
                    
                });
            });*/
            
            for(atual of carrinho){
                Produto.findByPk(atual.id,{
                    include: Uva
                }).then(resultado =>{
                    let vinho = {
                        ...resultado.dataValues,
                        qtd: atual.quantidade,
                        total: ()=> this.valor * this.qtd
                    }
                    let uvas = [];
                    for(uva of resultado.Uvas){
                        uvas.push(uva.nome_uva);
                    }
                    vinho = {
                        ...vinho,
                        Uvas: uvas
                    }

                    //return vinho
                    produtos.push(vinho);
                })
            }
            console.log("saiu do for");

            
            
        }
    },
    pagar: (req, res, next) => {
        res.render("pagamento", {
            title: title
        })
    }
}

module.exports = controller;