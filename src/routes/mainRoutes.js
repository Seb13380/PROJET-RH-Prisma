const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController");
const authguard = require("../services/authguard");
const employeController = require('../controllers/employeController');
const ordinateurController = require('../controllers/ordinateurController');

router.get("/", authguard, mainController.getHome);

// Routes protégées pour les employés
router.get('/employes', authguard, employeController.listEmployes);

// Routes protégées pour les ordinateurs
router.get('/ordinateurs', authguard, ordinateurController.listOrdinateurs);

module.exports = router;