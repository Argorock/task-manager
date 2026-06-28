const express = require("express");
const router = express.Router();
const questController = require("../controllers/questController");

router.get("/", questController.list);
router.get("/create", questController.createForm);
router.post("/create", questController.createQuest);
router.get("/:id", questController.detail);
router.post("/:id/complete", questController.completeQuest);


module.exports = router;
