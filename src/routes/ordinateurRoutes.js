const express = require("express");
const router = express.Router();
const ordinateurController = require("../controllers/ordinateurController");
const authguard = require("../services/authguard");

router.get("/", authguard, ordinateurController.listOrdinateurs);
router.get("/register", authguard, ordinateurController.showRegisterForm);
router.post("/register", authguard, ordinateurController.registerOrdinateur);

module.exports = router;