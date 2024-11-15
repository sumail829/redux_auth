const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const corsOptions=require('./config/corsOptions');
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler');

const PORT=process.env.PORT ||3500;


app.use(logger);


app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.use(express.static(path.join(__dirname,'./public')));

app.use('/',require('./routes/root'));
// app.use('/register',require('./routes/register'));
// app.use('/auth',require('./routes/auth'));
// app.get('/',(req,res)=>{
//     res.send('hello world');
// });


// app.use(verifyJWT);
app.use('/students', require('./routes/api/students'));


app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:"404 not found"});
    }else{
        res.type('txt').send("404 not found")
    }
})

app.use(errorHandler);

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));