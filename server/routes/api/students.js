const express=require('express');
const router=express.Router();
const studentController=require('../../controllers/studentsController')
const { route } = require('../auth');
const verifyJWT=require('../../middleware/verifyJWT');

router.route('/')
.get(studentController.getAllStudents)
.post(studentController.createNewStudents)
.put(studentController.updateStudents)
.delete(studentController.deleteStudents);


router.route('/:id')
   .get(studentController.getStudents);

module.exports = router;