const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const userRouter=require("./controllers/userRouter")
const postRouter=require("./controllers/postRouter")


const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://thapasya:9846@cluster0.w7irtzy.mongodb.net/userDb?retryWrites=true&w=majority",
{
    useNewUrlParser:true
})

app.use("/api/blog",userRouter)
app.use("/api/post",postRouter)

app.listen(3002,()=>{
    console.log("Server Running")
})