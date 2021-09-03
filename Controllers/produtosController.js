const title = "lasCopas - Produtos";

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
    },
    detalhe: (req, res, next) =>{
        res.render("produto", {
            title: title,
            rotulo: "/images/EM-roble.png",
            origem: "Argentina",
            uvas: ["malbec","merlot"],
            ano: 2016,
            preco: "79,90",
            tipo: "tinto",
            temDescricao: true,
            descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."
        })
    }

}

module.exports = controller;