const { PrismaClient } = require("../../generated/prisma")
const prisma = new PrismaClient({})

exports.getHome = async (req, res) => {
    try {
        const employes = await prisma.employe.findMany()
        const ordinateurs = await prisma.ordinateurs.findMany({
            include: { employe: true }
        })
        res.render("pages/home.twig", {
            user: req.session.user,
            employes,
            ordinateurs
        })
    } catch (error) {
        res.render("pages/home.twig", {
            user: req.session.user,
            employes: [],
            ordinateurs: []
        })
    }
}


