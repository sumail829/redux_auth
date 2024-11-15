const userDB={
    users:require('../model/user.json'),
    setUsers:function(data){this.users=data}
}

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');
require('dotenv').config();

const fsPromises=require('fs').promises;
const path=require('path');

const handleLogin=async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user||!pwd) return res.status(400).json({'message':'username and password are required'});
     const foundUser=userDB.users.find(person=>person.username===user);
     if(!foundUser)
        return res.sendStatus(401);
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        //create JWTs

        const accessToken=jwt.sign(
        {"username":foundUser.username},
        process.env.ACCESS_TOKEN_SECRET,    
        {expiresIn:'30s'}
    );
    const refreshToken=jwt.sign(
        {"username":foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,    
        {expiresIn:'1d'}
    );

    const otherUsers=usersDB.users.filter(person=>person.username!==foundUser.username);
    const currentUser={...foundUser,refreshToken};
    userDB.setUsers([...otherUsers,currentUser]);
    await fsPromises.writeFile(
        path.json(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users)
    )
        res.json({'success':`user ${user} is logged in!`});
    }else{
        res.sendStatus(401);
    }

}