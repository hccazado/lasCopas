const title = "lasCopas - Checkout";

//lista de objetos para testar!
const produtos = [
    {   id: 10,
        rotulo: "/images/EM-roble.png",
        finca: "Estancia Mendoza",
        uvas: "merlot,malbec",
        valor: 79.90,
        qtd: 2,
        total: ()=>this.valor*this.qtd
    },
    {   id: 12,
        rotulo: "/images/Trapiche - cabernet.png",
        finca: "Trapiche",
        uvas: "Suavignon",
        valor: 83.90,
        qtd: 3,
        total: ()=>this.valor*this.qtd
    },
]

const controller = {
    carrinho: (req, res, next) =>{
        res.render("carrinho", {
            title: title,
            produtos: produtos
        })
    }
}

module.exports = controller;