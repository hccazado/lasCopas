const title = "lasCopas - Produtos";
const tela = "produto";
const controller = {
    index: (req, res, next) =>{
        res.render("error", {
            title: title
        });
    },
    cadastro: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title
        });        
    }

}

module.exports = controller;