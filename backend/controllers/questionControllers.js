const Session =require("../models/Session")
const Question =require("../models/Question")

const addQuestionsToSession = async (req,res) =>{
    try {
        const {sessionId,questions} =req.body
        if(!sessionId || !questions || !Array.isArray(questions))
            return res.status(400).json({message:"invalid input data"})
        const session =await Session.findById(sessionId)
        if(!session)
            return res.status(404).json({message:"Session not found"})
        const questionDocs =await Question.insertMany(
            questions.map((q)=>({
                    session:sessionId,
                    ques:q.ques,
                    ans:q.ans
                }))
           )
        session.questions.push(...questionDocs.map((q)=>q._id));
        await session.save()
        res.status(201).json(questionDocs)

    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
};
const togglePinnedQuestion=async (req,res) =>{
    try {
        const question = await Question.findById(req.params.id)
        if(!question)
                return res.status(404).json({message:"Question not found"})
        question.isPinned=!question.isPinned
        await question.save()

        res.status(200).json({success:true,question})

    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
};
const updateQuestionNote=async (req,res) =>{
    try {
        const {note} = req.body
        const question = await Question.findById(req.params.id)
        if(!question)
           return res.status(404).json({message:"Question not found"})
        question.note=note || ""
        await question.save()

        res.status(200).json({success:true,question})
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
};

module.exports={addQuestionsToSession,togglePinnedQuestion,updateQuestionNote}