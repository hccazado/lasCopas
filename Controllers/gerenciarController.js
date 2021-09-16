const title = "lasCopas - Administração";

const clientes = [{
        id:123,
        nome: "Heitor",
        doc: "222.333.444-55"
    },
    {
        id:456,
        nome: "teste",
        doc: "333.333.444-55"
    },
    {
        id:765,
        nome: "DH",
        doc: "286-567.765/0001-90"
    },
]

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

const produtos = [
    { 
        id: 10,
        finca: "Trapiche",
        uvas: "suavignon",
        preco: 79.90
    }
]

const controller ={
    index: (req, res, next) =>{
        res.render("painelAdministrativo", {
            title: title
        });
    },
    listarClientes: (req, res, next) =>{
        res.render("listaClientes", {
            title:title,
            clientes: clientes
        })
    },
    listarPedidos: (req, res, next) =>{
        res.render("listaPedidos", {
            title:title,
            pedidos: pedidos
        })
    },
    listarProdutos: (req, res, next) =>{
        res.render("listaProdutos", {
            title: title,
            produtos: produtos
        })
    },
    formCadastroCliente: (req, res, next) =>{
        res.render("cadastroCliente", {
            title: title
        })
    },
    cadastrarCliente: (req, res, next) =>{
        //desestruturando objeto de dados do formulario cadastro de cliente em variareis
        let{nome, nascimento, email, pessoa, doc, cep, end1, complemento, uf, cidade} = req.body;

        //redirecionamento à pagina de login
        res.redirect("/login");
    }
};

module.exports = controller;