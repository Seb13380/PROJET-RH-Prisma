const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.listOrdinateurs = async (req, res) => {
    try {
        const ordinateurs = await prisma.ordinateurs.findMany();
        res.render('pages/ordinateurs', {
            ordinateurs,
        });
    } catch (error) {
        res.status(500).render('pages/ordinateurs', {
            error: 'Erreur lors du chargement des ordinateurs',
            ordinateurs: [],
        });
    }
};

exports.showRegisterForm = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany();
        res.render('pages/registerOrdinateur', { employes });
    } catch (error) {
        res.redirect('/ordinateurs');
    }
};

exports.registerOrdinateur = async (req, res) => {
    try {
        const { macAddress, marque, modele, disponible, statut, employeId } = req.body;

        const macRegex = /^([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2})$/;
        if (!macRegex.test(macAddress)) {
            return res.render('pages/registerOrdinateur', {
                error: "Format d'adresse MAC invalide",
            });
        }


        await prisma.ordinateurs.create({
            data: {
                macAddress: macAddress,
                marque,
                modele,
                disponible: disponible === "true" || disponible === true,
                statut,
                employeId: employeId ? parseInt(employeId) : null
            }
        });

        res.redirect('/ordinateurs');
    } catch (error) {
        console.log(error);
        
        let message = "Erreur lors de l'enregistrement de l'ordinateur";
        if (error.code === 'P2002') {
            message = "Cette adresse MAC existe déjà.";
        }
        res.render('pages/registerOrdinateur', {
            error: message,
        });
    }
};


