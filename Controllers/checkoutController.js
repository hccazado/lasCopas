const session = require("express-session");

const title = "lasCopas - Checkout";

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
        if(!req.session.carrinho){
            res.render("carrinho", {
                title: title,
                produtos: []
            })
        }
        else{
            let carrinho = req.session.carrinho
            //let produtos = [];
            let item = {}
            for(i in carrinho){
                item = {
                    id: i.id,
                    qtd: i.quantidade,
                }
            }
            res.render("carrinho", {
                title: title,
                produtos: produtos
            })
        }
        
    },
    pagar: (req, res, next) => {
        res.render("pagamento", {
            title: title
        })
    }
}

module.exports = controller;