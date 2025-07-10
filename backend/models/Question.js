const mongoose= require("mongoose")
const Schema=mongoose.Schema

const questionSchema = new Schema({
    session:{type:mongoose.Schema.Types.ObjectId,ref:"Session"},
    ques:{type:String},
    ans:{type:String},
    note:{type:String},
    isPinned:{type:Boolean,default:false}
},{timestamps:true})

const Question = mongoose.model("Question",questionSchema)
module.exports=Question
