const title="lasCopas - Login";
const controller={
    index: (req,res,next) =>{
        res.render("login",{
            title: title
        });
    }
};

module.exports = controller;