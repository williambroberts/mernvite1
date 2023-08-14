const errorHandler = (err,req,res,next)=>{
    console.log("status",res.status,res.statusCode)
    const statusCode = res.statusCode===200?500 : res.statusCode
    res.status = statusCode
    res.json({message:err.message})
    res.end()
}

const notFound = (err,req,res,next)=>{
    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

module.exports = {
    notFound,errorHandler
}