const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

hashPasswordGenerator = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
}

router.post("/add", async(req, res) => {
    //let name=req.body.name
    //let age=req.body.age
    //let mobile=req.body.mobile
    //let address=req.body.address
    //let pin=req.body.pin
    //let email=req.body.email
    //let password=req.body.password

    let { data } = { "data": req.body }
    let password = req.body.password
    hashPasswordGenerator(password).then(
        (hashedPassword) => {
            console.log(hashedPassword)
            data.password = hashedPassword
            console.log(data)
            let user = new userModel(data)
            let result = user.save()
            res.json({
                status: "success"
            })

        }
    )

    router.get("/view",async(req,res)=>{
        let result=await userModel.find()
        res.json(result)
    })
    

    router.post("/signin",async(req,res)=>{
        let input=req.body
        let email=req.body.email
        let data=await userModel.findOne({"email":email})
        if (!data) {
            return res.json({
                status:"incorrect mail"
            })
            
        }
        console.log(data)
        let dbpassword=data.password
        let inputpassword=req.body.password
        console.log(dbpassword)
        console.log(inputpassword)
        const match=await bcrypt.compare(inputpassword,dbpassword)
        if (!match) {
            return res.json(
                {
                    status:"invalid password"
                }
            )
            
        }
        res.json({
            
            status: "success","userData":input
        })
        

    })


    //let user=new userModel(data)
    //let result=await user.save()
    
})
module.exports = router