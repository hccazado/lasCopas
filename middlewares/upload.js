//importando multer e path
const multer = require("multer"); 
const path = require("path");

//Definindo local a salvar os rotulos e nome das imagens.
const storageRotulos = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads/rotulos");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"-"+Date.now()+"-"+path.extname(file.originalname));
    }
});

const uploadRotulo = multer({storage:storageRotulos});


module.exports = {
    uploadRotulo
}

