const express = require("express");
const router = express.Router();

const charactersController = require("../controllers/characterController");


router.get("/sheet", charactersController.sheet);


router.post("/sheet/save", charactersController.saveSheet);

module.exports = router;
