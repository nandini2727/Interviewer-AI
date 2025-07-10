const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    role:{type:String,required:true},
    experienceLevel:{type:String,required:true},
    topicsToFocus:{type:String,required:true},
    description:{type:String},
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]
},{timestamps:true})

const Session = mongoose.model("Session",sessionSchema)
module.exports =Session