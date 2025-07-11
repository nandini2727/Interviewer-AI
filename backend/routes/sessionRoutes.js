const {Router} =require("express")
const { createSession,deleteSession,getMySessions,getSessionById} =require("../controllers/sessionControllers")
const {requireAuth} =require("../middlewares/authMiddleware")
const sessionrouter=Router()

sessionrouter.post("/create",requireAuth,createSession)
sessionrouter.delete("/:id",requireAuth,deleteSession)
sessionrouter.get("/mySessions",requireAuth,getMySessions)
sessionrouter.get("/:id",requireAuth,getSessionById)

module.exports=sessionrouter
