const title="lasCopas - Login";

const {Login, Cliente, sequelize} = require('../models');
const { QueryTypes } = require('sequelize');

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
            //let autentica = clientesModel.sigIn(user);
            
            //Testando Sequelize
            //let login = await Cliente.findAll();

            //Buscando via Sequelize com Raw Query
            let login = await sequelize.query(
                'select nome, Login.id_login, email, senha, admin FROM Clientes INNER JOIN Login ON Clientes.id_login = Login.id_login where email like :email_form',
                {
                    replacements: {email_form: user.email},
                    type: QueryTypes.SELECT
                }
            );
            
            //Entra no if caso a query tenha encontrado o email informado
            if(login.length > 0){
                //Verificando se a senha do form confere com o hash recuperado do banco
                if(bcrypt.compareSync(user.password, login[0].senha)){
                    
                    //Objeto que será salvo na session
                    let usuarioLogado = {
                        email: login[0].email,
                        nome: login[0].nome,
                        admin: login[0].admin
                    }
                    req.session.user = usuarioLogado;
                    console.log("inicio de sessão do usuario: "+usuarioLogado.nome);

                    //Verificando se usuario é administrador e redirecionando para Home ou painel gerenciar
                    if(usuarioLogado.admin = 1){
                        return res.redirect("/gerenciar")
                    }
                    else{
                        return res.redirect("/")
                    }
                }
                //Bcrypt retornou false para compare de senha informada e Hash
                else{
                    res.render("login",{
                        title: title,
                        created: false,
                        error: {},
                        errorModel: "Senha Incorreta"
                    });
                }
                 
            }
            else{
                //A query não encontrou o email de login
                res.render("login",{
                    title: title,
                    created: false,
                    error: {},
                    errorModel: "Email não encontrado"
                });
            }
            
            /*
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
                   return res.redirect("/gerenciar");
                }
                //usuario nao admin será redirecionado à Home
                return res.redirect("/");
            }
            
            else if(autentica.login == false){
            res.render("login",{
                title: title,
                created: false,
                error: {},
                errorModel: autentica.message});
            }*/
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