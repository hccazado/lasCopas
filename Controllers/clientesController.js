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
        //recuperando dados do cliente no banco
        let dadosCliente = await Cliente.findByPk(id,{
            include:[{
                model: Login
            },
            {
            model: Endereco, as:"enderecos"
            }]
        });
        //definindo objeto com dataValues do retorno do sequelize
        let cliente = {
            ...dadosCliente.dataValues,
            ...dadosCliente.Login.dataValues,
            ...dadosCliente.enderecos[0].dataValues
        }
        //retornando view cadastroCliente, passando objeto gerado
        return res.render("cadastrocliente",{
            title: title,
            exists: false,
            errors: {},
            id: id,
            isEditing: true,
            cliente: cliente,
            old:{}
        })
        
    },
    cadastrar: async (req, res, next)=>{
        let errors = validationResult(req);
        //verifica se o validator retornou algum erro no check dos campos
        if(errors.isEmpty()){
            let cadastro = req.body;
            //realizando hash com salt 10 do password informado pelo usuario antes de realizar cadastro
            
            //hash de password abaixo esta funcionando
            cadastro.password = bcrypt.hashSync(cadastro.password, 10);
            
            //Primeira etapa do cadastro, criar Login
            let resultado = await Login.create({
                email: cadastro.email,
                senha: cadastro.password
            }).then(data =>{
                //console.log(data.dataValues.id_login);
                //Inserção do cliente com sucesso na criação de login
                Cliente.create({
                    nome: cadastro.nome,
                    sobrenome: cadastro.sobrenome,
                    dt_nascimento: cadastro.nascimento,
                    cadastro: cadastro.pessoa,
                    documento:cadastro.doc,
                    id_login: data.dataValues.id_login
                }).then(usuario=>{
                    //Inserindo Endereço do cliente com sucesso na criação do Cliente
                    Endereco.create({
                        cep: cadastro.cep,
                        endereco: cadastro.end1,
                        complemento: cadastro.complemento,
                        numero: cadastro.num,
                        bairro: cadastro.bairro,
                        cidade: cadastro.cidade,
                        uf: cadastro.uf,
                        id_cliente: usuario.dataValues.id_cliente
                    }).then(_ =>{
                        //Após todas inserções bem sucedidas, renderiza tela de login com msg sucesso.
                        return res.render("login", {
                            title:title,
                            created:true,
                            error: {},
                            old: {},
                            errorModel: null});
                    }).catch(err =>{
                        //Recuperando erro
                        console.log(err);
                    })  
                }).catch(err =>{
                    //recuperando erro
                    console.log(err)
                })
            }).catch(err => {
                //Houve erro na inserção do login. (email ja cadastrado na base)
                //renderiza form. cadastro com mensagem erro
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
    editar: async (req,res,next) => {
        let errors = validationResult(req);
        //desestruturando id do parametro da rota
        let id = req.params.id;

        //verifica se o validator retornou algum erro no check dos campos
        if(errors.isEmpty()){
            //recuperando dados do formulario
            let cadastro = req.body; 
            
            //Realizando busca de login, endereço e o proprio cadastro do cliente
            let dadosCliente = await Cliente.findByPk(id,{
                include:[{
                    model: Login
                },
                {
                model: Endereco, as:"enderecos"
                }]
            });

            //Verificando se a senha informada é a mesma já cadastrada
            //(nega valor true do compareSync)
            if(!bcrypt.compareSync(cadastro.password, dadosCliente.Login.senha)){
                //Hashing da senha informada no formulario
                cadastro.password = bcrypt.hashSync(cadastro.password, 10);
                //atualizando senha no Banco
                dadosCliente.Login.update({
                    senha: cadastro.password,
                }).then(_=>{
                    console.log("Nova senha definida");
                });
            }
            //Atualizando dados do cliente
            let updCliente = dadosCliente.update({
                nome: cadastro.nome,
                sobrenome: cadastro.sobrenome,
                dt_nascimento: cadastro.nascimento,
                cadastro: cadastro.pessoa,
                documento: cadastro.doc,
            })
            //atualizando dados do endereço
            let updEndereco = await dadosCliente.enderecos[0].update({
                cep: cadastro.cep,
                endereco: cadastro.end1,
                numero: cadastro.num,
                complemento: cadastro.complemento,
                bairro: cadastro.bairro,
                cidade: cadastro.cidade,
                uf: cadastro.uf
            })

            //Cliente Atualizado com sucesso. Renderiza para pagina de login com msg sucesso
            return res.render("login", {
                                title:title,
                                created:true,
                                error: {},
                                errorModel: null});

        }
        //Encontrado algum erro nos campos do formulario
        else{
            //console.log(errors.mapped());
            res.render("cadastroCliente", {
                title: title,
                exists: null,
                errors: errors.mapped(),
                old: req.body,
                id: id,
                isEditing: true,
                cliente: req.body 
            });
        }
    }
}

module.exports = controller;