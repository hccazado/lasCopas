const title = "lasCopas - Produtos";
const controller = {
    index: (req, res, next) =>{
        res.render("error", {
            title: title
        })
    }
}

module.exports = controller;