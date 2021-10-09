function autenticaLogin(req, res, next){
    //verifica se o objeto user na session é igual undefined(ainda nao atribuido)
    //e se há cookies de usuario
    //atribui os dados de sessao do cookie usuario à sessao
    
    /*
    //REMOVENDO COOKIE para login
    if(typeof(req.session.user) == "undefined" && req.cookies.user){
        //console.log("Authenticator - encontrou cookie user e autenticou");
        //console.log(req.cookies.user);
        req.session.user = req.cookies.user;
        return next();
    }
    //sessão indefinida e não há cookies de usuario
    else if((typeof(req.session.user) == "undefined") && (!req.cookies.user)){
        console.log("Authenticator - nao encontrou sessao nem cookie");
        res.redirect("/login");
    }
    //existe sessão ativa, segue ao proximo passo
    else if (typeof(req.session.user) != "undefined"){
        console.log("Authenticator - sessão encontrada")
        return next();
    }*/

    //--------------------------------------------------
    //Não há sessão iniciada
    if(typeof(req.session.user) == "undefined"){ 
        res.redirect("/login");
    }
    //existe sessão ativa, segue ao proximo passo
    else if (typeof(req.session.user) != "undefined"){
        console.log("Authenticator - sessão encontrada")
        return next();
    }
}

function autenticaAdmin(req, res, next){
    //verifica se sessão está aberta e usuario é admin
    if(req.session.user){
        //console.log("AutenticatorAdmin:dados da sessão:");
        //console.log(req.session);
        if(req.session.user.admin == true){
            console.log("Authenticator, usuario admin");
            return next();
        }
        //Usuario tem propriedade Admin FALSE
        else{
            res.render("login",{
                title: "lasCopas - Login",
                created: false,
                error: {},
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