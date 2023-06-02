const express = require('express')
const app = new express();
const cors = require('cors')

// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// post data
app.post('/create',(req,res)=>{
    var result = new studentModel(req.body)
    result.save()
    res.send("Data added")
})
// to view data
app.get('/see',async(req,res)=>{
   var data =  await studentModel.find()
   res.json(data)
})
// delete
app.delete('/delete/:id',async(req,res)=>{
    let id=req.params.id;
    await studentModel.findByIdAndDelete(id)
    res.json("Data deleted")
})
// update
app.put('/update/:id',async(req,res)=>{
    var id=req.params.id;
    await studentModel.findByIdAndUpdate(id,req.body)
    res.json("Data updated");
})

// import studentdb
const studentModel = require('./model/customer')

// api create
app.get('/view',(req,res)=>{
    res.json({"name":"Tiya","age":12})
})





// porting
app.listen(8008,()=>{
    console.log("port is running in port 8082")
})

//install npm i mongoose