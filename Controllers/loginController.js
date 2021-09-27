const title="lasCopas - Login";

const clientesModel = require("../model/clientesModel");

//importando validator
const {validationResult} = require("express-validator");

//importando bcryptjs
const bcrypt = require("bcryptjs");

const controller={
    index: (req,res,next) =>{
        res.render("login",{
            title:title,
            created: false,
            error: {},
            errorModel: null
        });
    },
    logar: (req, res, next) => {
        //atribuindo retorno do resultado de validação do Express Validator
        const errors = validationResult(req);

        //verificando se o objeto de validação é vazio(sem erros)
        if(errors.isEmpty()){
            let user = req.body;
            let autentica = clientesModel.sigIn(user);

            //Se a propriedade login conter valor diferente undefined (dados do login serão salvos no cookie)
            if(user.manterLogado!=undefined && autentica.login == true){
                console.log("manter logado");
                //enviando cookie ao cliente com dados de login e propriedade expire para definir por quanto tempo o msm será valido
                res.cookie("user", user, {expires: new Date(Date.now()+864000+(180*2592000))});
                req.session.user = user;
                res.redirect("/");
            }
            
            else if(user.manterLogado == undefined && autentica.login == true){ 
                req.session.user = user;
                console.log("sessao sem salvar cookie");
                res.redirect("/");
            }
            
            else if(autentica.login == false){
            res.render("login",{
                title: title,
                created: false,
                error: {},
                errorModel: autentica.message});
            }
        }   
        else{
            res.render("login",{
                title: title,
                created: false,
                errorModel: null,
                error: errors.mapped()});
        }
    }
};

module.exports = controller;