function autenticaLogin(req, res, next){
    //verifica se o objeto user na session é igual undefined(ainda nao atribuido)
    //e se há cookies de usuario
    //atribui os dados de sessao do cookie usuario à sessao
    //--------------------------------------------------
    //Não há sessão iniciada
    if(typeof(req.session.user) == "undefined"){ 
        res.redirect("/login");
    }
    //existe sessão ativa, segue ao proximo passo
    else if (typeof(req.session.user) != "undefined"){
        return next();
    }
}

function autenticaAdmin(req, res, next){
    //verifica se sessão está aberta e usuario é admin
    if(req.session.user){
        if(req.session.user.admin == true){
            return next();
        }
        //Usuario tem propriedade Admin FALSE
        else{
            res.render("login",{
                title: "Las Copas - Login",
                created: false,
                error: {},
                old: {},
                errorModel: "Usuario não é Administrador"
            });
        }
    }
    else{
        res.redirect("/login");
    }
}

module.exports = {
    autenticaLogin,
    autenticaAdmin
}