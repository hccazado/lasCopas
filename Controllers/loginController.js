const title="lasCopas - Login";

const {Login, Cliente} = require('../models');

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
    logar: async (req, res, next) => {
        //atribuindo retorno do resultado de validação do Express Validator
        const errors = validationResult(req);

        //verificando se o objeto de validação é vazio(sem erros)
        if(errors.isEmpty()){
            let user = req.body;
            let autentica = clientesModel.sigIn(user);
            let login = await Cliente.findAll({include: database.Login});
            console.log(login);
            
            //Se a propriedade login conter valor diferente undefined (dados do login serão salvos no cookie)
            
            //bloco comentado criava cookie com email e senha de login (função removida)
            /*if(user.manterLogado!=undefined && autentica.login == true){
                console.log("manter logado");
                //Atribuindo dados do usuario a objeto para guardar na Session
                let usuarioLogado = {
                    email: user.email,
                    nome: autentica.nome,
                    admin: autentica.admin
                }
                console.log("dados do objeto usuario para session")
                console.log(usuarioLogado);
                //enviando cookie ao cliente com dados de login e propriedade expire para definir por quanto tempo o msm será valido
                res.cookie("user", usuarioLogado, {expires: new Date(Date.now()+864000+(180*2592000))});
                req.session.user = usuarioLogado;
                if(usuarioLogado.admin){
                    res.redirect("/gerenciar");
                }
                res.redirect("/");
            }*/
            
            //else if(user.manterLogado == undefined && autentica.login == true){ 
            if(autentica.login == true){
                //console.log("sessao sem salvar cookie");
                //Atribuindo dados do usuario a objeto para guardar na Session
                let usuarioLogado = {
                    email: user.email,
                    nome: autentica.nome,
                    admin: autentica.admin
                }
                req.session.user = usuarioLogado;
                //console.log("dados do objeto usuario para session")
                console.log("inicio de sessão usuario: "+usuarioLogado.nome);
                //se usuario logado for administrador será redirecionado à rota gerenciar
                if(usuarioLogado.admin){
                    res.redirect("/gerenciar");
                }
                //usuario nao admin será redirecionado à Home
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