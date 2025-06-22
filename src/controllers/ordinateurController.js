const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.listOrdinateurs = async (req, res) => {
    try {
        const { q, disponible } = req.query;
        const where = {};

        if (q) {
            where.OR = [
                { marque: { contains: q } },
                { modele: { contains: q } },
                { macAddress: { contains: q } }
            ];
        }
        if (disponible === 'true') where.disponible = true;
        if (disponible === 'false') where.disponible = false;

        const ordinateurs = await prisma.ordinateurs.findMany({
            where,
            include: { employe: true }
        });
        res.render('pages/ordinateurs', {
            ordinateurs,
            q,
            disponible
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

exports.showEditForm = async (req, res) => {
    const ordinateur = await prisma.ordinateurs.findUnique({
        where: { id: Number(req.params.id) }
    });
    const employes = await prisma.employe.findMany();
    res.render('pages/editOrdinateur', { ordinateur, employes });
};

exports.editOrdinateur = async (req, res) => {
    const { macAddress, marque, modele, disponible, statut, employeId } = req.body;
    await prisma.ordinateurs.update({
        where: { id: Number(req.params.id) },
        data: {
            macAddress,
            marque,
            modele,
            disponible: disponible === "true" || disponible === true,
            statut,
            employeId: employeId ? parseInt(employeId) : null
        }
    });
    res.redirect('/ordinateurs');
};

exports.deleteOrdinateur = async (req, res) => {
    await prisma.ordinateurs.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/ordinateurs');
};

exports.showAttributeForm = async (req, res) => {
    const ordinateur = await prisma.ordinateurs.findUnique({ where: { id: Number(req.params.id) } });
    const employes = await prisma.employe.findMany();
    res.render('pages/attributeOrdinateur', { ordinateur, employes });
};

exports.attributeOrdinateur = async (req, res) => {
    const { employeId } = req.body;
    await prisma.ordinateurs.update({
        where: { id: Number(req.params.id) },
        data: {
            employeId: employeId ? parseInt(employeId) : null,
            disponible: !!employeId ? false : true
        }
    });
    res.redirect('/ordinateurs');
};


