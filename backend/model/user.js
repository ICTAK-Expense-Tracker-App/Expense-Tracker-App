const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://annmarywilson293@gmail.com:annmarywilson03@cluster0.fwg4655.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("db connected")
})
.catch(err=>console.log(err))
let Schema = mongoose.Schema
const userSchema = new Schema({
    name:String,
    place:String,
    age:Number,
    email:String,
    no:Number,
    Password:String,
    reEnterPassword:String
})
const User = new mongoose.model("User", userSchema)

module.exports = userModel