const jwt =require("jsonwebtoken")
const User=require("../models/user")

const requireAuth =async (req,res,next)=>{
   try{
        let token =req.headers.authorization;
        if(token &&token.startsWith("Bearer")){
            token =token.split(" ")[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findOne(decoded._id).select("-password")
            next()
        }
        else{
            res.status(401).json({message:"Unauthorized user"})
        }
   }
   catch(err){
        res.status(401).json({message:"Token failed",error:err.message})
   }
}

module.exports={requireAuth}