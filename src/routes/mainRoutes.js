const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController");
const authguard = require("../services/authguard");
const employeController = require('../controllers/employeController');
const ordinateurController = require('../controllers/ordinateurController');
const { PrismaClient } = require('../../generated/prisma'); 
const prisma = new PrismaClient();

router.get("/", authguard, mainController.getHome);
router.get('/', async (req, res) => {
    try {
        const employes = await prisma.employe.findMany();
        const ordinateurs = await prisma.ordinateurs.findMany();
        res.render('pages/home', {
            employes,
            ordinateurs,
            RH: req.session.RH
        });
    } catch (error) {
        res.render('pages/home', {
            employes: [],
            ordinateurs: [],
            error: "Erreur lors du chargement des données",
            RH: req.session.RH
        });
    }
});

// Routes protégées pour les employés
router.get('/employes', authguard, employeController.listEmployes);

// Routes protégées pour les ordinateurs
router.get('/ordinateurs', authguard, ordinateurController.listOrdinateurs);

module.exports = router;