const title = "lasCopas - Produtos";
const model = require("../model/produtosModel");
const {validationResult} = require("express-validator");

const {Produto, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;

const controller = {
    index: async (req, res, next) =>{
        //let Produtos = await Produto.findAll({
        //    include: [
        //        {association: 'uvas'} 
        //    ],
        //    raw: true,
        //    nest: true
        //}).then(produtos =>{
            /*for(let i=0; i< produtos.length; i++){
                console.log(produtos[i].id_produto +": "+produtos[i].finca +" Uvas:")
                console.log(produtos[i]);
            }*/
        //    console.log(produtos)
        //})

        let Produtos = await Produto.findAll({
            include: [{
                model: Uva,
                as: "uvas" 
                }
            ],
            raw: true,
            nest: true
        }).then(produtos =>{
            /*for(let i=0; i< produtos.length; i++){
                console.log(produtos[i].id_produto +": "+produtos[i].finca +" Uvas:")
                console.log(produtos[i]);
            }*/
            console.log(produtos)
        })

        //Trazendo associacao Uvas -> Produtos
        /*
        let Uvas = await Uva.findAll({
            include:{ association: "vinhos"},
            raw: true,
            nest: true
        }).then(result =>{
            console.log(result)
        })*/

        res.render("produtos", {
            title: title,
            vinhos: model.listarVinhos()
        });
    }, 
    cadastroProduto: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title,
            isEditing:false,
            errors:{}
        });        
    },
    cadastrarProduto: (req, res, next) =>{
        let errors = validationResult(req);
        console.log(req.body);
        console.log(errors);
        if(errors.isEmpty()){
            console.log("entrou errors empty cadastro produto")
            let{uvas, cosecha, tipo, finca, ano, preco, origem, descricao} = req.body;
            if(!req.file){
                console.log("chamou registro SEM rotulo");
                model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, " ", descricao);
            }else{
                console.log("chamou registro COM rotulo");
                let rotulo = "images/uploads/rotulos/"+req.file.filename
                model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, rotulo, descricao);
            }  
            res.redirect("/gerenciar/produtos");
        }
        else{
            res.render("cadastroProduto", {
                title: title,
                isEditing: false,
                errors:errors.mapped()
            });
        }

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