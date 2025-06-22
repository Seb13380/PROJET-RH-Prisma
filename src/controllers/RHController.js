const { PrismaClient } = require("../../generated/prisma")
const hashPasswordExtension = require("../services/extensions/hashPasswordExtension")
const bcrypt = require("bcrypt")


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
        const rh = await prisma.rH.findUnique({ where: { mail } });
        
        if (rh && await bcrypt.compare(password, rh.password)) {
            req.session.RH = rh;
            res.redirect('/');
        } else {
            res.render('pages/login', { error: 'Identifiants incorrects' });
        }
    } catch (error) {
        console.error(error);
        res.render('pages/login', { error: 'Erreur lors de la connexion' });
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err)
            return res.status(500).send("Erreur lors de la déconnexion")
        }
        res.redirect("/login");
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
            }
        });
        res.render('pages/employes', { employes });
    } catch (error) {
        console.error(error);
        res.render('pages/employes', { employes: [] });
    }
};

exports.addEmploye = async (req, res) => {
       
    await prisma.employe.create({
        data: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            mail: req.body.mail,
            password: req.body.password,
            genre: req.body.genre,
            rhId: req.session.RH.id
         }
    });
    res.redirect('/employes');
};

exports.editEmploye = async (req, res) => {
    const { nom, prenom, mail, genre } = req.body;
    await prisma.employe.update({
        where: { id: Number(req.params.id) },
        data: { nom, prenom, mail, genre }
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