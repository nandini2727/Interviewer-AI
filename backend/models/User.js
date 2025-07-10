const mongoose =require("mongoose")
const Schema=mongoose.Schema

const userSchema=new Schema({
    fullName :{
        type:String,
        minLength:[4,"Please enter valid a Name"],
        required:[true,"Please enter the Full Name"]
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,"Please enter an email"]
    },
    password:{
        type:String,
        required:[true,"Please enter an password"]
    },
    profilePhotoUrl:{
        type:String,
        default:null
    }
},{timestamps:true})

const User =mongoose.model("User",userSchema);
module.exports=User