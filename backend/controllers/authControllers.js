const User =require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const createToken =(userId)=>{
    
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
}
const loginUser =async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user =await User.findOne({email})
        if(user){
            const auth=await bcrypt.compare(password,user.password);
            if(auth){
                res.status(200).json({
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePhotoUrluser:user.profilePhotoUrl,
                token:createToken(user._id)
                }) 
                
            } 
            else{
                res.status(400).json({message:"Invalid Password"})
            }
        }
        else{
            res.status(400).json({message:"Invalid Email"})
        }

    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}

const logoutUser =(req,res)=>{
    try{

    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}
const uploadImage = (req,res)=>{
    if(!req.file)
        res.status(400).json({message:"No file found"})
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl})
}

const getProfile = async(req,res)=>{
    try{

        const user= await User.findById(req.user._id).select("-password")
        if(!user)
            res.status(400).json({message:"User not found"})
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}
const register =async (req,res)=>{
    const {fullName,email,password,profilePhotoUrl} = req.body;
    try{
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User Already Exists"})    
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        //CRAETE NEW USER
        const user = await User.create({fullName,email,password:hashPassword,profilePhotoUrl})
        res.status(200).json({
            fullName:user.fullName,
            email:user.email,
            password:user.password,
            profilePhotoUrluser:user.profilePhotoUrl,
            token:createToken(user._id)
        })
    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}

module.exports={loginUser,getProfile,logoutUser,uploadImage ,register}