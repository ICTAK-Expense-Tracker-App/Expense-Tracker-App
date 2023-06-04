const mongoose = require('mongoose')
<<<<<<< HEAD:backend/model/user.js
mongoose.connect('mongodb+srv://annmarywilson293@gmail.com:annmarywilson03@cluster0.fwg4655.mongodb.net/?retryWrites=true&w=majority')
=======

mongoose.connect('mongodb+srv://annmarywilson:annmarywilson@cluster0.fwg4655.mongodb.net/?retryWrites=true&w=majority')

// to check for error unimportant step
>>>>>>> d487f81840bfd7610c8a44c386dd3b36c6b744a2:backend/model/customer.js
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
<<<<<<< HEAD:backend/model/user.js
const User = new mongoose.model("User", userSchema)

module.exports = userModel
=======
var customerModel = mongoose.model("students",customerSchema)
module.exports = customerModel;
>>>>>>> d487f81840bfd7610c8a44c386dd3b36c6b744a2:backend/model/customer.js
