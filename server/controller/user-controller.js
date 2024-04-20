 import User from "../model/user.js";
 import Token from "../model/token.js";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcrypt";
 import dotenv from "dotenv";
 dotenv.config();
 export const signupUser=async (req,res)=>{
    try{
        const hpassword = await bcrypt.hash(req.body.password,12);
        const user = {username:req.body.username,name:req.body.name,password:hpassword};
        const newUser = new User(user);
        await newUser.save();
        const un = req.body.username;
        return res.status(200).json({msg:`user ${un} has been created`});

    }catch(error){
        return res.status(400).json({msg:`user has  not been created.there was some error.`});

    }

};

export const loginUser=async(req,res)=>{
    let user =await User.findOne({username:req.body.username});
    if(!user){
        return res.status(400).json({msg:"Username not Found"});
    }try{
       let match= await bcrypt.compare(req.body.password,user.password);
        if(match){
                const accessToken=  jwt.sign(user.toJSON(), process.env.ACCESS_SEC_KEY,{expiresIn:'15m'});
                const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SEC_KEY);

                const newToken=new Token({token:refreshToken});
                await newToken.save();
                return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
        }else{
            return res.status(400).json({msg:"password does not match"});
        }
    }catch(error){  
        return res.status(500).json({msg:"Error while login"});
    }
    
}