const title = "lasCopas - Home";
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
    }
};

module.exports = controller;