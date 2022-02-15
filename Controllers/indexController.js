const title = "lasCopas - Home";
const titleSobre = "LasCopas - Sobre";


const {Produto, ProdutoUva, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;

const controller = {
    index: async (req, res, next) =>{

        let Produtos = await Produto.findAll({
            where: {
                ativo:{
                    [Op.like]:"ativo"
                }
            },
            include: {model: Uva, as: "uvas"},
            raw: false,
            nested: true,
            limit: 3
        }).then(produtos =>{
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

            res.render("index", {
                title: title,
                vinhos: arrayVinhos
            })   
        })
    },
    envio:(req,res, next) =>{
        res.render("envio", {
            title: title
        });
    },
    sobre:(req,res,next) =>{
        res.render("sobre", {
            title: titleSobre
        })
    }
};

module.exports = controller;