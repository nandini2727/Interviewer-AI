require("dotenv").config()
const express =require("express")
const cors = require("cors")
const path =require("path")
const connectDb =require("./config/db")
const authRoutes = require("./routes/authRoutes")
const questionRoutes = require("./routes/questionRoutes")
const sessionRoutes = require("./routes/sessionRoutes")

const app=express()

//MIDDLEWARE TO SET UP CORS

app.use(cors({
    origin:"*",
    allowedHeaders:["Content-Type","Authorisation"],
    methods:["GET","PUT","POST","DELETE"]
}))


 //DATABASE CONNECTION
connectDb()

//MIDDLEWARES
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


//ROUTES
app.use("/api/auth",authRoutes)
// app.use("/api/sessions",sessionRoutes)
// app.use("/api/question",questionRoutes)


 //START SERVER
const PORT =process.env.PORT || 5000
app.listen(PORT,()=>console.log(`App listening at port ${PORT}`))

