const express = require("express");
const dbController = require("../controllers/db");
const router = express.Router();

router.get("/reset", dbController.reset);

module.exports = router;
