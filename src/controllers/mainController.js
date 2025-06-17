const { PrismaClient } = require("../../generated/prisma")
const prisma = new PrismaClient({})

exports.getHome = async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:req.session.user.id
            },
            include:{
                books:true
            }
        })
        res.render("pages/home.twig", {user: req.session.user, books:user.books})
    }
    catch(error){
        res.render("pages/home.twig", {user: req.session.user})
    }
}


