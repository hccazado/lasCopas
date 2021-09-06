const title = "lasCopas - Home";
const titleSobre = "LasCopas - Sobre";
const controller = {
    index: (req,res, next) =>{
        res.render("index", {
            title: title
        });
    },
    envio:(req,res, next) =>{
        res.render("envio", {
            title: title
        });
    },
    sobre:(req,res,next) =>{
        res.render("sobre", {
            title: titleSobre
        })
    }
};

module.exports = controller;