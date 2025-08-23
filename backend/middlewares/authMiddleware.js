const jwt =require("jsonwebtoken")
const User=require("../models/user")
const { ObjectId } = require("mongodb")


const requireAuth =async (req,res,next)=>{
   try{
        // let token =req.headers.authorization;
        const token =req.cookies.token;
        if(token){
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            const userId = new ObjectId(decoded.id);
            req.user = await User.findOne(userId).select("-password")
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