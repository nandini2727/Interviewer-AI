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
const cookieParser = require("cookie-parser")
const passport= require("passport")
require("./config/passport.js")
const jwt=require("jsonwebtoken")


const app=express()

//MIDDLEWARE TO SET UP CORS

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    allowedHeaders:["Content-Type","Authorization "],
    methods:["GET","PUT","POST","DELETE"]
}))



 //DATABASE CONNECTION
connectDb()

//MIDDLEWARES
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(cookieParser())
app.use(passport.initialize())

//ROUTES
app.use("/api/auth",authRoutes)
app.use("/api/session",sessionRoutes)
app.use("/api/question",questionRoutes)

app.use("/api/ai/generate-questions",requireAuth,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",requireAuth,generateConceptExplanation)

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user
//         let user = await User.findOne({ email: profile.emails[0].value });
//         if (!user) {
//           user = await User.create({
//             fullName: profile.displayName,
//             email: profile.emails[0].value,
//             profilePhotoUrl: profile.photos[0].value,
//           });
//         }
//         return done(null, user); // ✅ user goes to callback
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// ---------------- ROUTES ----------------

// Step 1: Redirect user to Google login
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);


app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

    res.redirect(`${process.env.CLIENT_URL}dashboard`); 
  }
);

 //START SERVER
const PORT =process.env.PORT || 5000
app.listen(PORT,()=>console.log(`App listening at port ${PORT}`))

