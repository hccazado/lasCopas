const title = "lasCopas - Produtos";
//const model = require("../model/produtosModel");
const {validationResult} = require("express-validator");

const {Produto, ProdutoUva, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;

const controller = {
    index: async (req, res, next) =>{

        let Produtos = await Produto.findAll({
            //include: [{model: Uva, as: 'uvas'}],
            include: Uva,
            raw: false,
            nested: true
        }).then(produtos =>{
            //vetor para armazenar objetos de produtos
            const arrayVinhos = [];
            //recorrendo array de produtos retornado pelo sequelize

            produtos.forEach(element => {
                //criando objeto vinho para receber desestruturaçao de cada elemento iterado no resultado sequelize
                let vinho = {
                    ...element.dataValues
                }
                //imprimindo estado atual do objeto vinho 
                //console.log(vinho)

                //criando vetor vazio para receber as uvas de cada produto
                let uvas = [];
                //iterando as uvas de cada produto
                element.dataValues.Uvas.forEach(element2 =>{
                    //adicionado prop nome_uva de cada iteraçao da ou das uvas do produto
                    uvas.push(element2.dataValues.nome_uva);

                    //Imprimindo nome da uva atual inserida no array de uvas
                    //console.log(element2.dataValues.nome_uva);
                })
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
            errors:{}
        });        
    },
    /*cadastrarProduto: (req, res, next) =>{
        let errors = validationResult(req);
        console.log(req.body);
        console.log(errors);
        if(errors.isEmpty()){
            //console.log("entrou errors empty cadastro produto")
            let{uvas, cosecha, tipo, finca, ano, preco, origem, descricao} = req.body;
            if(!req.file){
                console.log("chamou registro SEM rotulo");
                //model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, " ", descricao);
            }else{
                console.log("chamou registro COM rotulo");
                let rotulo = "images/uploads/rotulos/"+req.file.filename
                //model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, rotulo, descricao);
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

    },*/
    cadastrarProduto: async (req, res, next) =>{
        let errors = validationResult(req);
        console.log(req.body);
        console.log(errors);
        if(errors.isEmpty()){
            //console.log("entrou errors empty cadastro produto")
            let{uvas, cosecha, tipo, finca, ano, preco, origem, descricao} = req.body;
            if(!req.file){
                console.log("chamou registro SEM rotulo");
                let cadastro = await Produto.create(
                    {
                        finca,
                        cosecha,
                        tipo,
                        ano,
                        valor: preco,
                        origem,
                        ativo: true,
                        descricao,
                        produtouva: uvas
                    },{
                        include:[Uva]
                    }
                    )
                console.log(cadastro);
                //model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, " ", descricao);
            }else{
                console.log("chamou registro COM rotulo");
                let rotulo = "images/uploads/rotulos/"+req.file.filename
                //model.cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, rotulo, descricao);
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
    detalhe: async (req, res, next) =>{
        
        let {id} = req.params;
        let vinho = {};
        let produto = await Produto.findByPk(id,{
            include: Uva
        }).then(resultado =>{
            let uvas=[];
            resultado.Uvas.forEach(uva =>{

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
    }
}

module.exports = controller;