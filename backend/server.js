const express = require("express")
const mongoose = require("mongoose")
const UserModel = require("./Models/userModel")
const connectDB = require("./Config/db")
const asyncHandler = require('express-async-handler')
const cors = require('cors')
const bcrypt = require("bcryptjs")
const { errorHandler, notFound } = require("./Middleware/errorMiddleware")
const generateToken = require("./utils/generateToken")
connectDB()
const app = express()
const port = 5000
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
    res.json("Hello");
  })


app.get("/login",(req,res)=>{
    res.json("/login GET")
})


app.post("/login",asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const User = await UserModel.findOne({email})   
    if (!User){
        res.status(400)
        throw new Error(`User doesnt exist`)
    }else if (User && await bcrypt.compare(password,User.password)){
        res.statusCode=200
        //res.status=200
        res.json({
            id:User._id,
            email:User.email,
            username:User.username,
            token:generateToken(User._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credientials")
    }

}))
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})