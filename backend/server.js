require("dotenv").config()
const express =require("express")
const cors = require("cors")
const path =require("path")
const connectDb =require("./config/db")
const authRoutes = require("./routes/authRoutes")
const questionRoutes = require("./routes/questionRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const { requireAuth } = require("./middlewares/authMiddleware")
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiControllers")

const app=express()

//MIDDLEWARE TO SET UP CORS

app.use(cors({
    origin:"http://localhost:5173",
    allowedHeaders:["Content-Type","Authorization "],
    methods:["GET","PUT","POST","DELETE"]
}))


 //DATABASE CONNECTION
connectDb()

//MIDDLEWARES
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


//ROUTES
app.use("/api/auth",authRoutes)
app.use("/api/session",sessionRoutes)
app.use("/api/question",questionRoutes)

app.use("/api/ai/generate-questions",requireAuth,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",requireAuth,generateConceptExplanation)


 //START SERVER
const PORT =process.env.PORT || 5000
app.listen(PORT,()=>console.log(`App listening at port ${PORT}`))

