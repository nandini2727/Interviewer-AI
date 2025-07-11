const Session = require("../models/Session")
const Question = require("../models/Question")

const createSession =async (req,res)=>{
    try {
        const {role,experienceLevel,topicsToFocus,description,questions} = req.body;
        const user=req.user._id

        const session =await Session.create({
            user,
            role,
            experienceLevel,
            topicsToFocus,
            description
        })
        const questionDocs = await Promise.all(
            questions.map(async (q)=>{
                const question = await Question.create({
                    session : session._id,
                    ques: q.ques,
                    ans:q.ans
                })
                return question._id;
            })
        )
        session.questions=questionDocs
        await session.save()
        res.status(201).json({success:true,session})

    } catch (error) {
       res.status(500).json({success:false,message:"Server Error",error})
    }
}

const deleteSession =async(req,res)=>{
    try {
        const session =await Session.findById(req.params.id)
        
        if(!session)
            return res.status(404).json({success:false,message:"Session not found"})

        if(session.user.toString() !== req.user.id)
            return res.status(401).json({success:false,message:"User not authorised to delete this session"})

        await Question.deleteMany({session:session._id})
        await session.deleteOne()
        res.status(200).json({success:true,message:"Session deleted successfully"})

    } catch (error) {
        res.status(500).json({success:false,message:"Server Error",error})
    }
}

const getMySessions =async(req,res)=>{
    try {
        const sessions= await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("questions")
        res.status(200).json({success:true,sessions})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error",error})
    }
}

const getSessionById = async(req,res)=>{
    try {
        const session = await Session.findById(req.params.id)
        .populate({
            path:"questions",
            options:{sort:{isPinned:-1,createdAt:1}}
        })
        .exec()
        if(!session){
            return res.status(404).json({success:false,message:"Session not found"})
        }
        res.status(200).json({success:true,session})
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error",error})
    }
}

module.exports={
    createSession,
    deleteSession,
    getMySessions,
    getSessionById
}