const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const authguard = require("../middlewares/authguard");

router.get("/employes", authguard, employeController.listEmployes);

router.get("/employes/register", authguard, employeController.getEmployeRegister);
router.post("/employes/register", authguard, employeController.postEmployeRegister);

router.post("/employes/edit/:id", authguard, employeController.editEmploye);

router.post("/employes/delete/:id", authguard, employeController.deleteEmploye);

module.exports = router;