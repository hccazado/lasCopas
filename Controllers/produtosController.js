const title = "lasCopas - Produtos";
//const model = require("../model/produtosModel");
const {validationResult} = require("express-validator");

const {Produto, ProdutoUva, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;
const path = require("path");
const fs = require('fs');

const controller = {
    index: async (req, res, next) =>{

        let Produtos = await Produto.findAll({
            //include: [{model: Uva, as: 'uvas'}],
            include: {model: Uva, as: "uvas"},
            raw: false,
            nested: true
        }).then(produtos =>{
            //console.log(produtos);
            //vetor para armazenar objetos de produtos
            const arrayVinhos = [];
            //recorrendo array de produtos retornado pelo sequelize
            produtos.forEach(element => {
                //criando objeto vinho para receber desestruturaçao de cada elemento iterado no resultado sequelize
                let vinho = {
                    ...element.dataValues
                }
                //criando vetor vazio para receber as uvas de cada produto
                let uvas = [];
                //iterando as uvas de cada produto
                element.dataValues.uvas.forEach(element2 =>{
                    //adicionado prop nome_uva de cada iteraçao da ou das uvas do produto
                    uvas.push(element2.dataValues.nome_uva);
                });
                vinho = {
                    ...vinho,
                    uvas,
                }
                //Adicionando objeto de vinho ao array de produtos
                arrayVinhos.push(vinho)
            });

            res.render("produtos", {
                title: title,
                vinhos: arrayVinhos
            })

            
        })

    }, 

    cadastroProduto: (req, res, next) =>{
        res.render("cadastroProduto", {
            title: title,
            isEditing:false,
            old: null,
            errors:{}
        });        
    },

    cadastrarProduto: async (req, res, next) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //console.log("entrou errors empty cadastro produto")
            let{uvas, cosecha, tipo, finca, ano, estoque, preco, origem, ativo, descricao} = req.body;
            if(!req.file){
                //console.log("chamou registro SEM rotulo");
                let produtoCadastrado = await Produto.create(
                    {
                        finca,
                        cosecha,
                        tipo,
                        ano,
                        valor: preco,
                        estoque,
                        origem,
                        ativo,
                        descricao,
                    }
                )
                //console.log(produtoCadastrado);
                for(uva of uvas){
                    //console.log("chamada addUva do produto cadastrado: "+uva)
                    produtoCadastrado.addUvas(uva);    
                }
                //redirecionando para pagina de administraçao de produtos
                return res.redirect("/gerenciar/produtos");
            }
            //Fluxo padrão (cadastro de produto com imagem de rotulo)
                console.log("chamou registro COM rotulo");
                let rotulo = "images/uploads/rotulos/"+req.file.filename
                let produtoCadastrado = await Produto.create(
                    {
                        finca,
                        cosecha,
                        tipo,
                        ano,
                        valor: preco,
                        estoque,
                        origem,
                        ativo,
                        rotulo: rotulo,
                        descricao,
                    }
                )
                for(uva of uvas){
                    //console.log("chamada addUva do produto cadastrado: "+uva)
                    produtoCadastrado.addUvas(uva);    
                }
              
            res.redirect("/gerenciar/produtos");
        }
        else{
            res.render("cadastroProduto", {
                title: title,
                isEditing: false,
                old: req.body,
                errors:errors.mapped()
            });
        }
    },
    editarProduto: async (req, res, next) =>{
        let {id} = req.params;
        let{uvas, cosecha, tipo, finca, ano, preco, estoque, origem, ativo, descricao, rotulo} = req.body;
        let buscaProduto = await Produto.findByPk(id);
        if(req.file){
            let editar = {
                id: id,
                cosecha: cosecha,
                tipo: tipo,
                finca: finca,
                ano: ano,
                valor: preco,
                estoque: estoque,
                origem: origem,
                ativo: ativo,
                descricao: descricao,
                rotulo: "images/uploads/rotulos/"+req.file.filename
            }
            fs.unlink(path.resolve("public", buscaProduto.dataValues.rotulo), (err)=>{
                if(err){
                    console.error("Falha ao excluir rotulo antigo!");
                }
            })
            buscaProduto.update(editar);
            buscaProduto.setUvas(uvas).then(_=>{
                return res.redirect("/gerenciar/produtos");
            })
        }
        let editar = {
            id: id,
            cosecha: cosecha,
            tipo: tipo,
            finca: finca,
            ano: ano,
            valor: preco,
            estoque: estoque,
            origem: origem,
            ativo: ativo,
            descricao: descricao,
        }
        buscaProduto.update(editar);
        buscaProduto.setUvas(uvas).then(_=>{
            return res.redirect("/gerenciar/produtos");
        });    
    },
    detalhe: async (req, res, next) =>{
        
        let {id} = req.params;
        let vinho = {};
        let produto = await Produto.findByPk(id,{
            include: [{model: Uva, as: "uvas"}]
        }).then(resultado =>{
            let uvas=[];
            resultado.uvas.forEach(uva =>{

                uvas.push(uva.nome_uva);
            });
             vinho = {
                ...resultado.dataValues,
                uvas
            }   
        })
        res.render("detalheProduto", {
            title: title,
            vinho: vinho
        });
    },
    buscar: async (req, res, next) =>{
        let valor = req.params;
        if(isNaN(parseInt(valor))){
            
        }
    }
}

module.exports = controller;