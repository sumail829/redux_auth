const express=require('express');
const router=express.Router();
// const studentController=require('../../controllers/studentController');
// const verifyJWT=require('../../middleware/verifyJWT');
const data={};
data.students=require('../../model/students.json');

// router.route('/')
// .get(verifyJWT,studentController.getAllStudents)
// .post(studentController.createNewStudents)
// .put(studentController.updateStudents)
// .delete(studentController.deleteStudents);

router.route('/')
  .get((req,res)=>{
    res.json(data.students);
  })
  .post((req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    });
  })
  .put((req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    });
  })
  .delete((req,res)=>{
    res.json({"id":req.body.id})
  });

  router.route('/:id')
   .get((req,res)=>{
    res.json({"id":req.params.id})
   });

  module.exports=router;