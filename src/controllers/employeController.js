const { PrismaClient } = require("../../generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.listEmployes = async (req, res) => {
    try {
        const { q, poste, genre } = req.query;
        const where = {
            rhId: req.session.RH.id
        };

        if (q) {
            where.OR = [
                { nom: { contains: q } },
                { prenom: { contains: q } },
                { mail: { contains: q } }
            ];
        }
        if (poste) where.poste = poste;
        if (genre) where.genre = genre;

        const employes = await prisma.employe.findMany({ where });

        res.render('pages/employes', {
            employes,
            q,
            poste,
            genre,
            RH: req.session.RH
        });
    } catch (error) {

        res.status(500).render('pages/employes', {
            error: 'Erreur lors du chargement des employés',
            employes: [],
        });
    }
};

exports.getEmployeRegister = (req, res) => {
    res.render('pages/registerEmploye');
};

exports.showEditForm = async (req, res) => {
    const employe = await prisma.employe.findUnique({ where: { id: Number(req.params.id) } });
    res.render('pages/editEmploye', { employe });
};

exports.editEmploye = async (req, res) => {
    const { nom, prenom, mail, poste, genre } = req.body;
    await prisma.employe.update({
        where: { id: Number(req.params.id) },
        data: { nom, prenom, mail, poste, genre }
    });
    res.redirect('/employes');
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

        if (!nom || !prenom || !mail || !poste || !genre) {
            return res.render('pages/registerEmploye', {
                error: "Tous les champs sont obligatoires",
                RH: req.session.RH
            });
        }

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