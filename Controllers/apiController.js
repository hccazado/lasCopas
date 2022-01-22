const {Cliente, Endereco, Pedido, PedidoProduto, Produto, ProdutoUva, Uva, sequelize, Sequelize} = require('../models');
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
    },
    getPedido: async (req, res, next) =>{
        let id = req.params.id;
        console.log(id);
        if(!id){
            res.status(400).send("Deve informar Numero de pedido");
        }
        try{
            let pedido = await Pedido.findAll({
                include:[
                    {model: Cliente},
                    {model: Endereco},
                    {model: PedidoProduto, attributes:['valor'], 
                            include:{model: Produto, as: 'produto', attributes: ['finca']}}
                ]
            }).then(pedido=>{
                res.status(200).json(pedido);
            });
           
        }
        catch{
            res.status(501).send("Pedido não encontrado");
        }
    }  
}

module.exports = controller;