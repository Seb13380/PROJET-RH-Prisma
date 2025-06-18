
const authguard = (req, res, next) => {
    try {
        if (req.session.RH) {
            return next();
        }
        throw new Error("Utilisateur non connecté");
    }
    catch (error) {
        console.log("Auth Error:", error.message);
        res.redirect("/login");
    }
};

module.exports = authguard;