const {Router} = require("express")
const {logoutUser,loginUser,register,getProfile,uploadImage} =require("../controllers/authControllers")
const {requireAuth} = require("../middlewares/authMiddleware")
const upload =require("../middlewares/uploadMiddleware")

const authRouter =Router()

authRouter.get("/getprofile",requireAuth,getProfile)
authRouter.post("/logout",logoutUser)
authRouter.post("/login",loginUser)
authRouter.post("/register",register)

authRouter.post("/upload-image",upload.single("image"),uploadImage)

module.exports = authRouter