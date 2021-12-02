const{Produto, ProdutoUva, Uva, sequelize, Sequelize} = require("../models");
const Op = Sequelize.Op;
const controller = {

    //retornar os vinhos do tipo informado
    getVinhos: async (req, res, netx) =>{
        let tipo = req.params.tipo;
        let listaProdutos = [];
        let vinhos = await Produto.findAll({
            attributes: ['id_produto','finca','ano','valor','origem','rotulo','descricao'],
            where: {
                tipo: tipo
            },
            include: {model: Uva, as:"uvas"}
        });
        for(vinho of vinhos){
            let vinhoUvas=[];
            
            for(uva of vinho.uvas){
                vinhoUvas.push(uva.dataValues.nome_uva)
            }
            
            let produto = {
                ...vinho.dataValues,
                uvas: vinhoUvas
            }
            listaProdutos.push(produto);
        }
        res.json(listaProdutos);
        //console.log(vinhos)
    }
}

module.exports = controller;