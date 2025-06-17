const express = require("express");
const router = express.Router();
const RHController = require("../controllers/RHController");
const authguard = require("../services/authguard");

router.get("/register", RHController.getRegister);
router.post("/register", RHController.postRegister);

router.get("/login", RHController.getLogin);
router.post("/login", RHController.postLogin);

router.get("/logout", RHController.getLogout);

router.get("/employes", authguard, RHController.listEmployes);
router.post("/employes/add", authguard, RHController.addEmploye);
router.post("/employes/edit/:id", authguard, RHController.editEmploye);
router.post("/employes/delete/:id", authguard, RHController.deleteEmploye);
router.get("/home", authguard, RHController.getHome);

module.exports = router;


