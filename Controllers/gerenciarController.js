//Require dos controladores

const produtosController = require("./produtosController");
const produtosModel = require("../model/produtosModel");
const loginController = require("./loginController");
const clientesModel = require("../model/clientesModel");

//Titulo das paginas
const title = "lasCopas - Administração";

const pedidos = [
    {
        nro: 0012021,
        nome: "zé das couve",
        doc: "02234567890"
    },
    {
        nro: 0022021,
        nome: "zé do leite",
        doc: "04567878902"
    }
]

//Objeto com os metodos do controller a serem exportados
const controller ={
    index: (req, res, next) =>{
        res.render("painelAdministrativo", {
            title: title
        });
    },
    listarClientes: (req, res, next) =>{
        res.render("listaClientes", {
            title:title,
            clientes: clientesModel.listarClientes()
        });
    },
    listarPedidos: (req, res, next) =>{
        res.render("listaPedidos", {
            title:title,
            pedidos: pedidos
        });
    },
    listarProdutos: (req, res, next) =>{
        //Carregando lista de todos produtos do controller de produtos
        let produtos = produtosModel.listarVinhos();
        res.render("listaProdutos", {
            title: title,
            produtos: produtos
        });
    },
    formCadastroCliente: (req, res, next) =>{
        res.render("cadastroCliente", {
            title: title
        });
    },
    cadastrarCliente: (req, res, next) =>{
        //desestruturando objeto de dados do formulario cadastro de cliente em variareis
        let{nome, nascimento, email, password, pessoa, doc, cep, end1, complemento, uf, cidade} = req.body;
        
        clientesModel.cadastrarCliente(nome, nascimento, email, password, pessoa, doc, cep, end1, complemento, uf, cidade);
        //redirecionamento à pagina de login
        res.redirect("/login");
    },
    editarProduto: (req, res, next) =>{
        let id=req.params.id;
        let dadosProduto = produtosModel.buscarVinhoID(id);
        res.render("editarProduto",{
            title:title,
            id:id,
            produto: dadosProduto
        });
    }
};

module.exports = controller;