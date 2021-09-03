const title = "lasCopas - Produtos";
const vinhos = [{
    id:10,
    rotulo: "/images/EM-roble.png",
    finca: "Trapiche",
    origem: "Argentina",
    uvas: "malbec, merlot",
    ano: 2016,
    preco: "79,90",
    tipo: "tinto",
    temDescricao: true,
    descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."},
    {
        id:10,
        rotulo: "/images/Trapiche - cabernet.png",
        finca: "Traoiche",
        origem: "Argentina",
        uvas: ["Cabernet"],
        ano: 2018,
        preco: "74,90",
        tipo: "tinto",
        temDescricao: false,
        descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."}]
const controller = {
    index: (req, res, next) =>{
        res.render("produtos", {
            title: title,
            vinhos: vinhos
        });
    },
    cadastro: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title
        });        
    },
    detalhe: (req, res, next) =>{
        res.render("detalheProduto", {
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