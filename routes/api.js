const express = require("express");
const router = express.Router();
const apiController = require("../Controllers/apiController");

router.get("/vinhos/:tipo", apiController.getVinhos);

module.exports = router;