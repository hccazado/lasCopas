const title = "Las Copas - Cadastro Cliente";
const clientesModel = require("../model/clientesModel");
const {validationResult} = require("express-validator");

const controller = {
    cadastrar: (req, res, next)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let cadastro = req.body;
            let {created, exists} = clientesModel.cadastrarCliente(cadastro);
            if (created == true){
                res.render("login", {
                title:title,
                created:true});
            }
            else{
                res.render("cadastroCliente", {
                    title: title,
                    exists: true,
                    errors: {}
                });
            }
        }
        else{
            console.log(req.body);
            console.log(errors.mapped());
            res.render("cadastroCliente", {
                title: title,
                exists: null,
                errors: errors.mapped(),
                old: req.body
            });
        }
    }
}

module.exports = controller;