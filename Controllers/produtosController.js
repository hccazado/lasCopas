const title = "lasCopas - Produtos";
const vinhos = [{
        id:10,
        rotulo: "images/uploads/rotulos/EM-roble.png",
        finca: "Trapiche",
        origem: "Argentina",
        uvas: "malbec, merlot",
        ano: 2016,
        preco: "79,90",
        tipo: "tinto",
        temDescricao: true,
        descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."},
    {
        id:20,
        rotulo: "images/uploads/rotulos/Trapiche - cabernet.png",
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
    cadastroProduto: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title
        });        
    },
    cadastrarProduto: (req, res, next) =>{
        let{uvas, cosecha, tipo, finca, ano, preco, origem} = req.body;
        let resultado = {
            uvas: uvas,
            cosecha: cosecha,
            tipo: tipo,
            finca: finca,
            ano: ano,
            preco: preco,
            origem: origem,
            //concatenando path relativo com nome do arquivo para correta exibição no card
            rotulo: "images/uploads/rotulos/"+req.file.filename
        }
        vinhos.push(resultado);
        console.log(resultado);
        res.redirect("/produtos");
    },
    detalhe: (req, res, next) =>{
        let produto = vinhos.find(vinho =>{
            if(vinho.id == req.params.id){
                console.log(vinho);
                return vinho;
            }
        })
        res.render("detalheProduto", {
            title: title,
            /*rotulo: "/images/uploads/rotulos/EM-roble.png",
            origem: "Argentina",
            uvas: ["malbec","merlot"],
            ano: 2016,
            preco: "79,90",
            tipo: "tinto",
            temDescricao: true,
            descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."
            */
           vinho: produto
        })
    }

}

module.exports = controller;