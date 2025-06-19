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

exports.postEmployeRegister = async (req, res) => {
    try {
        const { nom, prenom, mail, password, age, genre } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.employe.create({
            data: { nom, prenom, mail, password: hashedPassword, age: age ? Number(age) : null, genre }
        });
        res.redirect('/employes');
    } catch (error) {
        res.render('pages/registerEmploye', { error });
    }
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

exports.showRegisterForm = async (req, res) => {
    try {
        res.render('pages/registerEmploye', { RH: req.session.RH });
    } catch (error) {
        console.error(error);
        res.redirect('/employes');
    }
};

exports.registerEmploye = async (req, res) => {
    try {
        const { nom, prenom, mail, genre } = req.body;

        if (!nom || !prenom || !mail || !genre) {
            return res.render('pages/registerEmploye', {
                error: "Tous les champs sont obligatoires",
                RH: req.session.RH
            });
        }

        const newEmploye = await prisma.employe.create({
            data: {
                nom,
                prenom,
                mail,
                genre,
                rhId: req.session.RH.id
            }
        });

        res.redirect('/employes');
    } catch (error) {
        console.error('Erreur détaillée:', error);
        res.render('pages/registerEmploye', {
            error: "Erreur lors de l'ajout de l'employé",
            RH: req.session.RH
        });
    }
};