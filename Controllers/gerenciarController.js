const title = "lasCopas - Administração";

const controller ={
    index: (req, res, next) =>{
        res.render("painelAdministrativo", {
            title: title
        })
    }
};

module.exports = controller;