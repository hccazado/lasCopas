const title = "Las Copas - Cadastro Cliente";
const clientesModel = require("../model/clientesModel");
const {validationResult} = require("express-validator");

const controller = {
    cadastrar: (req, res, next)=>{
        let errors = validationResult(req);
        //verifica se o validator retornou algum erro no check dos campos
        if(errors.isEmpty()){
            let cadastro = req.body;
            let {created, exists} = clientesModel.cadastrarCliente(cadastro);
            //Cliente cadastrado com sucesso (email ainda não existe), redireciona para pagina login
            if (created == true){
                res.render("login", {
                title:title,
                created:true,
                error: {},
                errorModel: null});
            }
            //Email informado já existe cadastro
            else{
                res.render("cadastroCliente", {
                    title: title,
                    exists: true,
                    errors: {},
                    id: null,
                    isEditing: false,
                    cliente: {} 
                });
            }
        }
        //Encontrado algum erro nos campos do formulario
        else{
            console.log(req.body);
            console.log(errors.mapped());
            res.render("cadastroCliente", {
                title: title,
                exists: null,
                errors: errors.mapped(),
                old: req.body,
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