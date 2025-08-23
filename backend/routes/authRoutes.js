const {Router} = require("express")
const {loginUser,register,getProfile,uploadImage,logoutUser} =require("../controllers/authControllers")
const {requireAuth} = require("../middlewares/authMiddleware")
const upload =require("../middlewares/uploadMiddleware")

const authRouter =Router()

authRouter.get("/getprofile",requireAuth,getProfile)

authRouter.post("/login",loginUser)
authRouter.post("/register",register)
authRouter.post("/logout",logoutUser)
authRouter.post("/upload-image",upload.single("image"),uploadImage)

module.exports = authRouter