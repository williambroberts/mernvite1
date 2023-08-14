const mongoose = require('mongoose')



const userSchema =new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            Unique:true
        },
        password:{
            type:String,
            required:true

        }
    },
    {
        timestamps:true
    }
)
const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel