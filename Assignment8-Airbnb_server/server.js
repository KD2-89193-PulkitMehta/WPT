const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config/config')
const utils = require('./utils/util')
const userRouter = require('./routes/user')
const result = require('./utils/util')
const propertyRouter = require('./routes/property')
const categoryRouter = require('./routes/category')
const bookingRouter = require('./routes/booking')


const app = express()

app.use(cors())

app.use(express.json())
app.use((req,res,next)=>{
    if(req.url === '/users/login' || 
        req.url === '/users/registration' || 
        req.url.startsWith('/image/')
    ){
        next()
    }
    else{
        const token = req.headers.token
        if(token){
            try{
                const payload = jwt.verify(token,config.secret)
                req.headers.id = payload.id
                next()
            }catch(error){
                res.send(result.createErrorResult("Token is invalid"))
            }
        }else{
            res.send(result.createErrorResult("Token is missing"))
        }   
    }
})

app.use('/users',userRouter)
app.use('/property',propertyRouter)
app.use('/category',categoryRouter)
app.use('/booking',bookingRouter)

app.listen(4000,'0.0.0.0',()=>{
    console.log("Server started at 4000")
})