const express = require("express");
const router = express.Router();
const questController = require("../controllers/questController");

router.get("/create", questController.createForm);
router.post("/create", questController.createQuest);
router.post("/complete/:id", questController.completeQuest);
router.post("/delete/:id", questController.deleteQuest);

module.exports = router;
