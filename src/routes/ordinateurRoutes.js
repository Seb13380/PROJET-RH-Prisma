const express = require("express");
const router = express.Router();
const ordinateurController = require("../controllers/ordinateurController");
const authguard = require("../services/authguard");

router.get("/", authguard, ordinateurController.listOrdinateurs);

router.get("/register", authguard, ordinateurController.showRegisterForm);
router.post("/register", authguard, ordinateurController.registerOrdinateur);

router.get("/attribute/:id", authguard, ordinateurController.showAttributeForm);
router.post("/attribute/:id", authguard, ordinateurController.attributeOrdinateur);

router.get("/edit/:id", authguard, ordinateurController.showEditForm);
router.post("/edit/:id", authguard, ordinateurController.editOrdinateur);

router.post("/delete/:id", authguard, ordinateurController.deleteOrdinateur);


module.exports = router;