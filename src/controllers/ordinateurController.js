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
        const { macAddress, marque, modele } = req.body;

        const macRegex = /^([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2})$/;
        if (!macRegex.test(macAddress)) {
            throw new Error('Format d\'adresse MAC invalide');
        }

        const normalizedMacAddress = macAddress.replace(/[:-]/g, '').toUpperCase();

        await prisma.ordinateurs.create({
            data: {
                macAddress: normalizedMacAddress,
                marque,
                modele,
                rhId: req.session.RH.id
            }
        });

        res.redirect('/ordinateurs');
    } catch (error) {
        console.error('Erreur détaillée lors de l\'enregistrement de l\'ordinateur :', error);
        res.render('pages/registerOrdinateur', {
            error: "Erreur lors de l'enregistrement de l'ordinateur",
            RH: req.session.RH
        });
    }
};