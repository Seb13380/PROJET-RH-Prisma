const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const authguard = require("../services/authguard");

router.get("/register", authguard, employeController.showRegisterForm);

router.post("/register", authguard, employeController.registerEmploye);

router.get("/", authguard, employeController.listEmployes);

router.post("/edit/:id", authguard, employeController.editEmploye);
router.get("/edit/:id", authguard, employeController.showEditForm);

router.post("/delete/:id", authguard, employeController.deleteEmploye);

module.exports = router;