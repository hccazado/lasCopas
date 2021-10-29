const session = require("express-session");

const carrinho = {
    addItem: (req, res, next)=>{

        if(!req.session.carrinho){
            let carrinho = [];
            let produto = {
                id: req.params.id,
                quantidade: 1
            };
            carrinho.push(produto);
            req.session.carrinho = carrinho;
            console.log("Carrinho vazinho, add item.");
            console.log(req.session.carrinho);
            return res.redirect("/produtos");
        }
        else{
            let carrinho = req.session.carrinho;
            let produto = {
                id: req.params.id,
                quantidade: 1
            };
            carrinho.push(produto);
            req.session.carrinho = carrinho;
            console.log("carrinho nao esta vazio. add mais um item");
            console.log(req.session.carrinho);
            return res.redirect("/produtos");
        }
    },
    removeItem: (req, res, next) =>{

    },
    retornaLista: (req, res, next) =>{

    }
}

module.exports = carrinho;