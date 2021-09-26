function autenticaLogin(req, res, next){
    //verifica se o objeto user na session é igual undefined(ainda nao atribuido)
    //e redireciona à pagina de login
   /* if(req.cookies.user && typeof(req.session.user) == "undefined"){
    console.log("Authenticator - encontrou cookie user e autenticou");
    console.log(req.cookies.user);
        next();
    }
    if((typeof(req.session.user) == "undefined") && (!req.cookies.user)){
        res.redirect("/login");
    }
    //se o objeto user for definido seguira ao proximo passo da pilha
    else{
        next();
    }*/

    if(typeof(req.session.user == "undefined")){
        if(req.cookies.user){
            req.session.user = req.cookies.user;
            return next();
        }
        res.redirect("/login");
    }
    else{
        return next();
    }
}

module.exports = {
    autenticaLogin
}