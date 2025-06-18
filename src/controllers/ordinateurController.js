const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

exports.listOrdinateurs = async (req, res) => {
    try {
        const ordinateurs = await prisma.ordinateurs.findMany({
            include: {
                employe: true
            }
        });
        res.render('pages/ordinateurs', { ordinateurs });
    } catch (error) {
        console.error(error);
        res.render('pages/ordinateurs', { ordinateurs: [] });
    }
};

exports.getOrdinateurRegister = (req, res) => {
    res.render('pages/registerOrdinateur');
};

exports.postOrdinateurRegister = async (req, res) => {
    try {
        const { macAddress, marque, modele } = req.body;
        await prisma.ordinateurs.create({
            data: {
                macAddress,
                marque,
                modele,
                rhId: req.session.RH.id
            }
        });
        res.redirect('/ordinateurs');
    } catch (error) {
        console.error(error);
        res.render('pages/registerOrdinateur', { error });
    }
};

exports.editOrdinateur = async (req, res) => {
    try {
        const { macAddress, marque, modele } = req.body;
        await prisma.ordinateurs.update({
            where: { id: Number(req.params.id) },
            data: { macAddress, marque, modele }
        });
        res.redirect('/ordinateurs');
    } catch (error) {
        console.error(error);
        res.redirect('/ordinateurs');
    }
};

exports.deleteOrdinateur = async (req, res) => {
    try {
        await prisma.ordinateurs.delete({
            where: { id: Number(req.params.id) }
        });
        res.redirect('/ordinateurs');
    } catch (error) {
        console.error(error);
        res.redirect('/ordinateurs');
    }
};