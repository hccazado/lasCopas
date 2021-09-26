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
            //console.log(autentica); //imprimindo retorno do metodo Sigin modelClientes

            //Se a propriedade login conter valor diferente undefined (dados do login serão salvos no cookie)
            if(user.manterLogado!=undefined){
                console.log("manter logado");
                res.cookie("user", user, {max:600000});
            }
            
            if(autentica.login == true){
                req.session.user = user;
                res.redirect("/");
               /* res.render("login",{
                    title:title,
                    created: false,
                    error: {},
                    errorModel: autentica.message
                });*/
            }else{
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