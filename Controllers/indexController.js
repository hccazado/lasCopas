const title = "lasCopas - Home";
const controller = {
    index: (req,res, next) =>{
        res.render("index", {
            title: title
        });
    }
};

module.exports = controller;