const title="lasCopas - Login";

const clientesModel = require("../model/clientesModel");

//importando validator
const {validationResult} = require("express-validator");

const controller={
    index: (req,res,next) =>{
        res.render("login",{
            title: title,
            created: false
        });
    },
    logar: (req, res, next) => {
        //atribuindo retorno do resultado de validação do Express Validator
        const errors = validationResult(req);

        //verificando se o objeto de validação é vazio(sem erros)
        if(errors.isEmpty()){
            let user = req.body;
            let autentica = clientesModel.sigIn(user);
            console.log(autentica);

        }
        else{
            console.log("Encontrou erros"+errors.array());
        }
    }
};

module.exports = controller;