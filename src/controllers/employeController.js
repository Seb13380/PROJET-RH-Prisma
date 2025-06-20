const { PrismaClient } = require("../../generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.listEmployes = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany();

        res.render('pages/employes.twig', {
            employes,
            RH: req.session.RH
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/employes', {
            error: 'Erreur lors du chargement des employés',
            employes: [],
            RH: req.session.RH
        });
    }
};

exports.getEmployeRegister = (req, res) => {
    res.render('pages/registerEmploye');
};


exports.editEmploye = async (req, res) => {
    try {
        const { nom, prenom, mail, age, genre } = req.body;
        await prisma.employe.update({
            where: { id: Number(req.params.id) },
            data: { nom, prenom, mail, age: age ? Number(age) : null, genre }
        });
        res.redirect('/employes');
    } catch (error) {
        res.redirect('/employes');
    }
};

exports.deleteEmploye = async (req, res) => {
    try {
        await prisma.employe.delete({ where: { id: Number(req.params.id) } });
        res.redirect('/employes');
    } catch (error) {
        res.redirect('/employes');
    }
};

exports.showRegisterForm = (req, res) => {
    res.render('pages/registerEmploye', {
        RH: req.session.RH
    });
};

exports.registerEmploye = async (req, res) => {
    try {
        const { nom, prenom, mail, poste, genre } = req.body;

        // Vérification des champs obligatoires
        if (!nom || !prenom || !mail || !poste || !genre) {
            return res.render('pages/registerEmploye', {
                error: "Tous les champs sont obligatoires",
                RH: req.session.RH
            });
        }

        // Création de l'employé
        await prisma.employe.create({
            data: {
                nom,
                prenom,
                mail,
                poste,
                genre,
                rhId: parseInt(req.session.RH.id)
            }
        });

        res.redirect('/employes');
    } catch (error) {
        let message = "Erreur lors de l'ajout de l'employé";
        if (error.code === 'P2002') {
            message = "Cet email existe déjà.";
        }
        res.render('pages/registerEmploye', {
            error: message,
            RH: req.session.RH
        });
    }
};