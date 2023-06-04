// import mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://annmarywilson:annmarywilson@cluster0.fwg4655.mongodb.net/?retryWrites=true&w=majority')

// to check for error unimportant step
.then(()=>{
    console.log("db connected")
})
.catch(err=>console.log(err))

let Schema = mongoose.Schema
const customerSchema = new Schema({
    cname:String,
    cgrade:Number
})
var customerModel = mongoose.model("students",customerSchema)
module.exports = customerModel;