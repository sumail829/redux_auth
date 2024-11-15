const data={
    students:require('../model/students.json'),
    setStudents:function(data){this.students=data}
};



const getAllStudents=(req,res)=>{
     res.json(data.students);
}

const createNewStudents=(req,res)=>{
    const newStudents={
        id:data.students[data.students.length-1].id+1||1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }
    if(!newStudents.firstname || !newStudents.lastname){
        return res.status(400).json({'message':'first and last name required'});
    }
    data.setStudents([...data.students,newStudents]);
    res.status(201).json(data.students);
}

const updateStudents=(req,res)=>{
   const student=data.students.find(stu=>stu.id===parseInt(req.body.id));
   if(!student){
    return res.status(400).json({"message":`student id ${req.body.id} not found`});
   }
   if(req.body.firstname) student.firstname=req.body.firstname;
   if(req.body.lastname) student.lastname=req.body.lastname;
   const filterArray=data.students.filter(stu=>stu.id !==parseInt(req.body.id));
   const unsortedArray=[...filterArray,student];
   data.setStudents(unsortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0));
   res.json(data.students);
}

const deleteStudents=(req,res)=>{
    const student=data.students.find(stu=>stu.id===parseInt(req.body.id));
    if(!student){
     return res.status(400).json({"message":`student id ${req.body.id} not found`});
    }
    const filterArray=data.students.filter(stu=>stu.id !==parseInt(req.body.id));
    data.setStudents([...filterArray]);
    res.json(data.students);
}

const getStudents=(req,res)=>{
    const student=data.students.find(stu=>stu.id===parseInt(req.params.id));
    if(!student){
     return res.status(400).json({"message":`student id ${req.params.id} not found`});
    }
    res.json(student);
}

module.exports={
    getAllStudents,
    createNewStudents,
    updateStudents,
    deleteStudents,
    getStudents,
}
