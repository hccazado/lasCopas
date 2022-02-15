const session = require("express-session");

const carrinho = {
    addItem: (req, res, next)=>{
        let {id} = req.params;
        let {quantidade} = req.body;
        if(!req.session.carrinho){
            let carrinho = [];
            let produto = {
                id: id,
                quantidade: quantidade
            };
            carrinho.push(produto);
            req.session.carrinho = carrinho;
            return res.redirect("/produtos");
        }
        //variavel carrinho presente na session
            //atribuindo conteudo da variavel carrinho da session a uma variavel
            let carrinho = req.session.carrinho;
            //recorrendo vetor do carrinho
            for(let i=0; i<carrinho.length; i++){
                //verificando se o id do produto selecionado ja se encontra no array
                if(carrinho[i].id == id){
                    //array encontrado, alterando valor da quantidade
                    carrinho[i].quantidade = quantidade;
                    //substituindo valor da variavel carrinho na session pela atual
                    req.session.carrinho = carrinho;
                    //retornado para pagina produtos
                    return res.redirect("/produtos");
                }
            }
            //Terminou de recorrer array e nao encontrou o id do produto selecionado
            //criando objeto do novo produto selecionado
            let produto = {
                id,
                quantidade
            };
            //adicionado novo objeto ao vetor de produtos selecionados
            carrinho.push(produto);
            //atribuindo valor do array à session
            req.session.carrinho = carrinho;
            //retornando pagina de produtos
            return res.redirect("/produtos");
    },
    removeItem: (req, res, next) =>{

    },
    retornaLista: (req, res, next) =>{

    }
}

module.exports = carrinho;