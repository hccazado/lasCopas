const{Produto, ProdutoUva, Uva, sequelize, Sequelize} = require("../models");
const Op = Sequelize.Op;
const controller = {

    //retornar os vinhos do tipo informado
    getVinhos: async (req, res, next) =>{
        let tipo = req.params.tipo;
        let listaProdutos = [];
        if(tipo == "tinto" || tipo == "branco" || tipo == "rose" || tipo == "frisante"){
            try{
                let vinhos = await Produto.findAll({
                    attributes: ['id_produto','finca','ano','valor','origem','rotulo','descricao'],
                    where: {
                        tipo: tipo,
                        ativo: "ativo"

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
                res.status(200).json(listaProdutos);
            }catch{
                res.status(503).send("erro de servidor");
            }
       
        }
        else{
            res.status(404).send("Tipo de vinho invalido");
            return;
        }
    }  
}

module.exports = controller;