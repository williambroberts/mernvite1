const jwt = require('jsonwebtoken')
const JWT_SECRET = 'abc123'
const generateToken = (res,userId)=>{
    const token = jwt.sign({data:userId},JWT_SECRET,{expiresIn:'1d'})

    res.token =token
}

module.exports = generateToken