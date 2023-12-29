const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesController');
const ROLES_LIST =require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');
// const verifyJWT = require('../../middlewares/verifyJWT');
// const path = require('path');


router.route('/')
    .get(employeeController.getAllemployes)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;