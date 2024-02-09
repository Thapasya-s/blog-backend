const express=require("express")
const postModel=require("../models/postModel")
const router=express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let post=new postModel(data)
   
    let result=await post.save()
    res.json({
        status:"success"
    })
})

router.get("/viewall",async(req,res)=>{
    let result=await postModel.find()
    .populate("userid","name age mobile address").exec()
    res.json(result)
})
module.exports=router