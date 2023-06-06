
const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://annmarywilson:<password>@cluster0.fwg4655.mongodb.net/Users?retryWrites=true&w=majority')
    console.log("mongodb connected")

/*.then(()=>{
    console.log("db connected")
})
.catch(()=>{
    console.log('failed');
})*/


let newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

var collection = mongoose.model("collection",newSchema)

module.exports=collection