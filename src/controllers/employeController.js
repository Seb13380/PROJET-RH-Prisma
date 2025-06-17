const { PrismaClient } = require("../../generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.listEmployes = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany();
        res.render('pages/employes', { employes });
    } catch (error) {
        res.render('pages/employes', { employes: [], error });
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