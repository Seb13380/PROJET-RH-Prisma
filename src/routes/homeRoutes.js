const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

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

module.exports = router;

