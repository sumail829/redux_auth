const express=require('express');
const router=express.Router();
const studentController=require('../../controllers/studentsController')
// const { route } = require('../auth');
// const verifyJWT=require('../../middleware/verifyJWT');
const ROLES_LIST=require('../../config/roles_list');
const verifyRoles=require('../../middleware/verifyRoles');

router.route('/')
.get(studentController.getAllStudents)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),studentController.createNewStudents)
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),studentController.updateStudents)
.delete(verifyRoles(ROLES_LIST.Admin),studentController.deleteStudents);


router.route('/:id')
   .get(studentController.getStudents);

module.exports = router;