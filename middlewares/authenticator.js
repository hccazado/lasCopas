function autenticaLogin(req, res, next){
    //verifica se o objeto user na session é igual undefined(ainda nao atribuido)
    //e redireciona à pagina de login
    if(typeof(req.session.user) == "undefined"){
        res.redirect("/login");
    }
    //se o objeto user for definido seguira ao proximo passo da pilha
    else{
        next();
    }
}

module.exports = {
    autenticaLogin
}