const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const authguard = require("../services/authguard");

// Liste des employés
router.get("/employes", authguard, employeController.listEmployes);

// Formulaire inscription employé
router.get("/employes/register", authguard, employeController.getEmployeRegister);
router.post("/employes/register", authguard, employeController.postEmployeRegister);

// Modifier un employé
router.post("/employes/edit/:id", authguard, employeController.editEmploye);

// Supprimer un employé
router.post("/employes/delete/:id", authguard, employeController.deleteEmploye);

module.exports = router;