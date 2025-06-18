const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.listOrdinateurs = async (req, res) => {
    try {
        const ordinateurs = await prisma.ordinateur.findMany();
        res.render('pages/ordinateurs', {
            ordinateurs,
            RH: req.session.RH
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/ordinateurs', {
            error: 'Erreur lors du chargement des ordinateurs',
            ordinateurs: [],
            RH: req.session.RH
        });
    }
};

exports.showRegisterForm = async (req, res) => {
    try {
        res.render('pages/registerOrdinateur', {
            RH: req.session.RH
        });
    } catch (error) {
        console.error(error);
        res.redirect('/ordinateurs');
    }
};

exports.registerOrdinateur = async (req, res) => {
    try {
        const { nom, marque, type } = req.body;
        await prisma.ordinateur.create({
            data: {
                nom,
                marque,
                type
            }
        });
        res.redirect('/ordinateurs');
    } catch (error) {
        console.error(error);
        res.render('pages/registerOrdinateur', {
            error: 'Erreur lors de l\'enregistrement de l\'ordinateur',
            RH: req.session.RH
        });
    }
};