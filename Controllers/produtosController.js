const title = "lasCopas - Produtos";
const model = require("../model/produtosModel");


const controller = {
    index: (req, res, next) =>{
        res.render("produtos", {
            title: title,
            vinhos: model.listarVinhos()
        });
    }, 
    cadastroProduto: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title
        });        
    },
    cadastrarProduto: (req, res, next) =>{
        let{uvas, cosecha, tipo, finca, ano, preco, origem, descricao} = req.body;
        let rotulo = "images/uploads/rotulos/"+req.file.filename
        //chamando metodo de cadastro de produto no model
        model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, rotulo);
 
        res.redirect("/produtos");
    },
    editarProduto: (req, res, next) =>{
        let id = req.params.id;
        let{uvas, cosecha, tipo, finca, ano, preco, origem, descricao} = req.body;
        let editar = {
            id: id,
            uvas: uvas,
            cosecha: cosecha,
            tipo: tipo,
            finca: finca,
            ano: ano,
            preco: preco,
            origem: origem,
            descricao: descricao,
            rotulo : null
        }
        if(!req.file){
            model.editarVinho(editar);
        }
        else {
            var rotulo = "images/uploads/rotulos/"+req.file.filename;
            editar.rotulo = rotulo;
            model.editarVinho(editar);
        }
        res.redirect("/gerenciar/produtos");
    },
    detalhe: (req, res, next) =>{
        let produto = model.buscarVinhoID(req.params.id);
        res.render("detalheProduto", {
            title: title,
            vinho: produto
        });
    }
}

module.exports = controller;