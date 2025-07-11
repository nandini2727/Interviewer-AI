const {Router} =require("express")
const {addQuestionsToSession,togglePinnedQuestion,updateQuestionNote} =require("../controllers/questionControllers")
const {requireAuth} =require("../middlewares/authMiddleware")
const quesRouter=Router()

quesRouter.post("/add",requireAuth,addQuestionsToSession)
quesRouter.post("/:id/pin",requireAuth,togglePinnedQuestion)
quesRouter.post("/:id/note",requireAuth,updateQuestionNote)

module.exports=quesRouter