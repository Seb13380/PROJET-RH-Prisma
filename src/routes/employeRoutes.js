const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const authguard = require("../services/authguard");

router.get("/register", authguard, employeController.showRegisterForm);
router.post("/register", authguard, employeController.postEmployeRegister);
router.get("/employes", authguard, employeController.listEmployes);

module.exports = router;