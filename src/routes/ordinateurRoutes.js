const express = require("express");
const router = express.Router();
const ordinateurController = require("../controllers/ordinateurController");
const authguard = require("../services/authguard");

router.get("/", ordinateurController.listOrdinateurs);

router.get("/register", ordinateurController.getOrdinateurRegister);

router.post("/register", ordinateurController.postOrdinateurRegister);

router.post("/edit/:id", ordinateurController.editOrdinateur);

router.post("/delete/:id", ordinateurController.deleteOrdinateur);

module.exports = router;