const title = "Las Copas - Cadastro Cliente";
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

const {Login, Cliente, Endereco, sequelize, Sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

const controller = {
    formCadastrarCliente: (req, res, next) =>{
        res.render("cadastroCliente", {
            title: title,
            exists: false,
            errors: {},
            id: null,
            isEditing: false,
            cliente: {},
            old: {}
        });
    },
    formEditarCliente: async (req, res, next) => {
        let id = req.params.id;
        let dadosCliente = await Cliente.findByPk(id,{
            include:[{
                model: Login
            },
            {
            model: Endereco, as:"enderecos"
            }]
        });
        console.log(dadosCliente.enderecos);
        /*let resultado = clientesModel.buscarClienteID(id);
        console.log(resultado);
        res.render("cadastroCliente", {
            title: title,
            exists: false,
            errors: [],
            id: id,
            isEditing: true,
            cliente: resultado,
            old: {} 
        })*/
    },
    cadastrar: async (req, res, next)=>{
        let errors = validationResult(req);
        //verifica se o validator retornou algum erro no check dos campos
        if(errors.isEmpty()){
            let cadastro = req.body;
            //realizando hash com salt 10 do password informado pelo usuario antes de realizar cadastro
            
            //hash de password abaixo esta funcionando
            cadastro.password = bcrypt.hashSync(cadastro.password, 10);
            
            
            let resultado = await Login.create({
                email: cadastro.email,
                senha: cadastro.password
            }).then(data =>{
                console.log(data.dataValues.id_login);
                Cliente.create({
                    nome: cadastro.nome,
                    sobrenome: cadastro.sobrenome,
                    dt_nascimento: cadastro.nascimento,
                    cadastro: cadastro.pessoa,
                    documento:cadastro.doc,
                    id_login: data.dataValues.id_login
                }).then(usuario=>{
                    Endereco.create({
                        cep: cadastro.cep,
                        endereco: cadastro.end1,
                        complemento: cadastro.complemento,
                        numero: cadastro.num,
                        cidade: cadastro.cidade,
                        uf: cadastro.uf,
                        id_cliente: usuario.dataValues.id_cliente
                    }).then(_ =>{
                        return res.render("login", {
                            title:title,
                            created:true,
                            error: {},
                            old: {},
                            errorModel: null});
                    }).catch(err =>{
                        console.log(err);
                    })  
                }).catch(err =>{
                    console.log(err)
                })
            }).catch(err => {
                console.log(err);
                return res.render("cadastroCliente", {
                    title: title,
                    exists: true,
                    errors: {},
                    id: null,
                    isEditing: false,
                    cliente: {},
                    old:{}
                });
            })
        }
        //Encontrado algum erro nos campos do formulario
        else{
            console.log(req.body);
            let old = req.body;
            console.log(errors.mapped());
            res.render("cadastroCliente", {
                title: title,
                exists: null,
                errors: errors.mapped(),
                old: old,
                id: null,
                isEditing: false,
                cliente: {} 
            });
        }
    },
    editar: (req,res,next) => {
        let errors = validationResult(req);
        let id = req.params.id;
        //verifica se o validator retornou algum erro no check dos campos
        if(errors.isEmpty()){
            let cadastro = req.body;
            cadastro.password = bcrypt.hashSync(cadastro.password, 10);
            let update = clientesModel.editarCliente(id, cadastro);
            //Cliente atualizado com sucesso, redireciona para pagina login
            if (update == true){
                res.render("login", {
                title:title,
                created:true,
                error: {},
                errorModel: null});
            }
            //atualização falhou
            else{
                res.redirect("/", {
                    title: title,
                });
            }
        }
        //Encontrado algum erro nos campos do formulario
        else{
            console.log(req.body);
            console.log(errors.mapped());
            let resultado = clientesModel.buscarClienteID(id);
            res.render("cadastroCliente", {
                title: title,
                exists: null,
                errors: errors.mapped(),
                old: req.body,
                id: id,
                isEditing: true,
                cliente: resultado 
            });
        }
    }
}

module.exports = controller;