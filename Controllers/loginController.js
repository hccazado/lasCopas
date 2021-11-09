const title="lasCopas - Login";

const {Login, Cliente, sequelize, Sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

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

            let login = await Cliente.findAll({
                attributes:['nome'],
                include:{
                    model: Login,
                    as: 'login',
                    attributes:['email', 'senha', 'admin'],
                    where: {email: { [Op.like]:user.email}}
                }
            })

            //Entra no if caso a query tenha encontrado o email informado
            if(login.length > 0){
                //Verificando se a senha do form confere com o hash recuperado do banco
                if(bcrypt.compareSync(user.password, login[0].dataValues.login.senha)){
                    
                    //Objeto que será salvo na session
                    let usuarioLogado = {
                        email: login[0].dataValues.login.email,
                        nome: login[0].nome,
                        admin: login[0].dataValues.login.admin
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