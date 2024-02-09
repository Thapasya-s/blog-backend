const mongoose=require("mongoose")
const postSchema=new mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"blog"
        },
        post:{
            type:String,
            required:true
        },
        postdate:{
            type:Date,
            default:Date.now
        }
}
)


module.exports=mongoose.model("posts",postSchema)