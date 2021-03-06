//Require dos controladores

const produtosController = require("./produtosController");
const {Cliente, Endereco, Pedido, PedidoProduto, Produto, ProdutoUva, Uva, sequelize, Sequelize} = require('../models');
const Op = Sequelize.Op;
const loginController = require("./loginController");

//Titulo das paginas
const title = "lasCopas - Administração";


//Objeto com os metodos do controller a serem exportados
const controller = {
    index: (req, res, next) => {
        res.render("painelAdministrativo", {
            title: title
        });
    },
    listarClientes: async (req, res, next) => {
        let buscaClientes = await Cliente.findAll({
            attributes: ["id_cliente","nome", "documento"]
        })
        res.render("listaClientes", {
            title: title,
            clientes: buscaClientes
        });
    },
    listarPedidos: async (req, res, next) => {
        let estruturaPedidos =[];
        let item = {};

        let pedidos = await Pedido.findAll({
            include:[
                {model: Cliente, attributes: ['documento', 'nome']},
                {model: Endereco, attributes: ['endereco']}            
            ]
        });

        for(pedido of pedidos){
            item = {
                nro: pedido.dataValues.id_pedido,
                cliente: pedido.dataValues.Cliente.nome,
                endereco: pedido.dataValues.Endereco.endereco,
                data: pedido.dataValues.data
            }
            estruturaPedidos.push(item);
        }

        res.render("listaPedidos", {
            title: title,
            pedidos: estruturaPedidos
        });
    },
    listarProdutos: async (req, res, next) => {
        //Carregando lista de todos produtos do controller de produtos
        let produtos = [];
        let items = await Produto.findAll({
            include: {
                model: Uva,
                as: "uvas"
            }
        }).then(resultado =>{
            let vinho = {};
            resultado.forEach(atual =>{
                let uvas = [];
                atual.uvas.forEach(uva=>{                    
                    uvas.push(uva.nome_uva);
                });
                let vinho = {
                    ...atual.dataValues,
                    uvas
                }
                produtos.push(vinho);
            })
        })
        return res.render("listaProdutos", {
            title: title,
            produtos: produtos
        });
    },
    buscarClientes: async (req, res, next) =>{
        let valor = req.params.valor;
        let buscar = '';
        if(isNaN(parseInt(valor))){
            let clientes = await Cliente.findAll({
                where:{
                    [Op.or]:{
                        nome:{ [Op.substring]: valor },
                        sobrenome:{ [Op.substring]: valor}
                    }
                }
            });
            res.render("listaClientes", {
                title: title,
                clientes: clientes
            });
        }
        else{
            let clientes = await Cliente.findAll({
                where:{
                    documento:{
                        [Op.substring]: valor
                    }
                },
                attributes: ['id_cliente', 'nome', 'documento']
            });
            res.render("listaClientes", {
                title: title,
                clientes: clientes
            });
        }  
    },
    buscarProdutos: async (req, res, next) =>{
        let valor = req.params.valor;
        let produtos = [];
        let items = await Produto.findAll({
            include: {
                model: Uva,
                as: "uvas"
            },
            where: {
                [Op.or]:{
                    finca: { [Op.substring]: valor},
                    origem: { [Op.substring]: valor},
                    ativo: { [Op.like]: valor}
                }
            }
        }).then(resultado =>{
            if(!resultado){
                return res.render("listaProdutos", {
                    title: title,
                    produtos: []
                });
            }
            let vinho = {};
            resultado.forEach(atual =>{
                let uvas = [];
                atual.uvas.forEach(uva=>{
                    uvas.push(uva.nome_uva);
                });
                let vinho = {
                    ...atual.dataValues,
                    uvas
                }
                produtos.push(vinho);
            })
        })
        console.log(produtos);
        return res.render("listaProdutos", {
            title: title,
            produtos: produtos
        });
    },

    buscarPedidos: async (req, res, next) =>{
        let id = req.params.valor;
        let estruturaPedidos =[];
        let item = {};

        let pedidos = await Pedido.findAll({
            where:{
                [Op.or]:{
                    id_pedido:{[Op.like]: id}
                }
            },
            include:[
                {model: Cliente, attributes: ['documento', 'nome']},
                {model: Endereco, attributes: ['endereco']}            
            ]
        });

        for(pedido of pedidos){
            item = {
                nro: pedido.dataValues.id_pedido,
                cliente: pedido.dataValues.Cliente.nome,
                endereco: pedido.dataValues.Endereco.endereco,
                data: pedido.dataValues.data
            }
            estruturaPedidos.push(item);
        }

        res.render("listaPedidos", {
            title: title,
            pedidos: estruturaPedidos
        });

    },

    detalhePedido: async (req, res, next) =>{
        let id = req.params.id;
        if(!id){
            res.status(400).send("Deve informar Numero de pedido");
        }
        try{
            let vinho = {};
            let pedido = await Pedido.findAll({
                where: {id_pedido: id},
                include:[
                    {model: Cliente, attributes:['nome', 'sobrenome', 'dt_nascimento', 'cadastro', 'documento']},
                    {model: Endereco, attributes: ['cep', 'endereco', 'complemento', 'numero', 'cidade', 'bairro', 'uf']},
                    {model: PedidoProduto, attributes:['valor', 'quantidade'], 
                            include:{model: Produto, as: 'produto', attributes: ['finca'],
                            include:[{model: Uva, as:"uvas"}]
                            }
                    }
                ]
            }).then(pedido=>{
                let vetorProdutos = [];
                
                for (item of pedido[0].PedidoProdutos){
                    let produto = {};
                    let vetorUva = [];
                    produto = {
                        valor: item.dataValues.valor,
                        quantidade: item.dataValues.quantidade,
                        finca: item.produto.finca
                    }
                                        
                    for(uva of item.produto.uvas){
                        vetorUva.push(uva.nome_uva);
                    }
                    produto.uvas = vetorUva;
                    vetorProdutos.push(produto);
                }
                return res.render("detalhePedido", {
                    pedido: pedido[0],
                    produtos: vetorProdutos});
            });
           
        }
        catch{
            res.status(501).send("Pedido não encontrado");
        }
    },

    formCadastroCliente: (req, res, next) => {
        res.render("cadastroCliente", {
            title: title,
            exists: false,
            errors: {},
            id: null,
            isEditing: false,
            cliente: {},
            old: {}
        });
    },
    editarProduto: async (req, res, next) => {
        let id = req.params.id;
        let dadosProduto = await Produto.findByPk(id,{
            include:{model: Uva, as:"uvas"}
        }).then(resultado =>{
            let uvas = [];
            resultado.dataValues.uvas.forEach(uva =>{
                uvas.push(uva.id_uva);
            });
            let vinho ={
                ...resultado.dataValues,
                uvas
            }

            res.render("cadastroProduto", {
                title: title,
                id: id,
                produto: vinho,
                isEditing: true,
                errors: {}
            });
        })
    }
};

module.exports = controller;