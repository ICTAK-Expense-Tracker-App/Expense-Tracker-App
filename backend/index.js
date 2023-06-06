const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get('/see',async(req,res)=>{
    var data =  await collection.find()
    res.json(data)
})


app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    var result = new collection(req.body)
    result.save()
    res.send("data added")
})

const  collection  = require('./model/user')

app.get('/view',(req,res)=>{
    res.json({"name":"Tiya","password":12})
})
app.listen(8003,()=>{
    console.log("port connected")
})


