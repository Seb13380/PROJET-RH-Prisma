const { PrismaClient } = require("../../generated/prisma")
const hashPasswordExtension = require("../services/extensions/hashPasswordExtension")
const bcrypt = require("bcrypt")
const twig = require('twig');

const prisma = new PrismaClient({}).$extends(hashPasswordExtension)

exports.getRegister = async (req, res) => {
    res.render('pages/register');
}

exports.postRegister = async (req, res) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            const responsable = await prisma.RH.create({
                data: {
                    raisonSociale: req.body.raisonSociale,
                    siret: req.body.siret,
                    mail: req.body.mail,
                    password: req.body.password ,
                    name: req.body.name,
                }
            });
            res.redirect("/login");
        }
        else throw ({ confirmPassword: "Veuillez renseigner des mots de passe identiques" })
    }
    catch (error) {
        console.log(error);
        res.render('pages/register', { error });
    }
}

exports.getLogin = async (req, res) => {
    res.render('pages/login');
}

exports.postLogin = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const RH = await prisma.RH.findUnique({ where: { mail } });
        if (!RH) throw "Identifiants invalides";
        const valid = await bcrypt.compare(password, RH.password);
        if (!valid) throw "Identifiants invalides";
        req.session.RH = { id: RH.id, name: RH.name };
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('pages/login', { error: { global: "Identifiants invalides" } });
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err)
            return res.status(500).send("Erreur lors de la déconnexion")
        }
        res.redirect("/login")
    })
}

exports.listEmployes = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany({
            select: {
                id: true,
                nom: true,
                prenom: true,
                mail: true,
                genre: true,
                age: true
            }
        });
        res.render('pages/employes', { employes });
    } catch (error) {
        console.error(error);
        res.render('pages/employes', { employes: [] });
    }
};

exports.addEmploye = async (req, res) => {
    const { nom, prenom, mail, password, age, genre } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.employe.create({
        data: { nom, prenom, mail, password: hashedPassword, age: age ? Number(age) : null, genre }
    });
    res.redirect('/employes');
};

exports.editEmploye = async (req, res) => {
    const { nom, prenom, mail, age, genre } = req.body;
    await prisma.employe.update({
        where: { id: Number(req.params.id) },
        data: { nom, prenom, mail, age: age ? Number(age) : null, genre }
    });
    res.redirect('/employes');
};

exports.deleteEmploye = async (req, res) => {
    await prisma.employe.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/employes');
};

exports.getHome = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany({
            select: {
                id: true,
                nom: true,
                prenom: true,
                mail: true,
                age: true,
                genre: true
            }
        });
        res.render('pages/home', { 
            RH: req.session.RH,
            employes: employes
        });
    } catch (error) {
        console.error(error);
        res.render('pages/home', { 
            RH: req.session.RH,
            employes: []
        });
    }
};