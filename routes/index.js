var express = require('express');
var router = express.Router();
var controller = require("../Controllers/indexController");

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
