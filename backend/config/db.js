const mongoose=require("mongoose")
require("dotenv").config()
const db_uri=process.env.DB_URI

const connectDb= async()=>{
      try{
        await mongoose.connect(db_uri)
        console.log("connected to mongo db")
      }
      catch(err){
        console.error("Connection to DB failed ",err)
      }
}

module.exports=connectDb