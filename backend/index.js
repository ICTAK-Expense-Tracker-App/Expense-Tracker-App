const express = require('express')
const {model}=require('mongoose')
const app = new express();
//const userModel = require('./model/userdb');
const cors=require('cors')



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post("/Login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
})

app.post("/SignUp", (req, res)=> {
    const { name, place , age ,email , no , password ,reEnterPassword } = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                place,
                age,
                email,
                no,
                Password,
                reEnterPassword
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
})

app.listen(9002,() => {
    console.log("BE started at port 9002")
})


