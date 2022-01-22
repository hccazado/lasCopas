const express = require("express");
const router = express.Router();
const apiController = require("../Controllers/apiController");

router.get("/vinhos/:tipo", apiController.getVinhos);
router.get("/pedidos/:id", apiController.getPedido);

module.exports = router;