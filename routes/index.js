var express = require('express');
var router = express.Router();
var controller = require("../Controllers/indexController");

/* GET home page. */
router.get('/', controller.index);
router.get("/envio", controller.envio);
router.get("/sobre", controller.sobre);
router.get("/sair", (req, res, next)=>{
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
