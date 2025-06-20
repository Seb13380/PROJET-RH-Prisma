const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const authguard = require("../services/authguard");

// Affiche le formulaire d'ajout d'employé
router.get("/register", authguard, employeController.showRegisterForm);

// Traite le formulaire d'ajout d'employé
router.post("/register", authguard, employeController.registerEmploye);

// Liste tous les employés
router.get("/", authguard, employeController.listEmployes);

// (optionnel) édition et suppression si tu veux les routes REST
router.post("/edit/:id", authguard, employeController.editEmploye);
router.post("/delete/:id", authguard, employeController.deleteEmploye);

module.exports = router;