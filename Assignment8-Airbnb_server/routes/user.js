const express = require('express')
const pool = require('../db/mysql')
const result = require('../utils/util')
const config =require('../config/config')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/profile',(req,res)=>{
    const sql =`select firstName,lastName,phoneNumber,email from user where isDeleted=0`;
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post('/registration',(req,res)=>{
    const {firstName,lastName,email,password,phoneNumber} =req.body
    const sql = `insert into user(firstName,lastName,email,password,phoneNumber,isDeleted)
                values(?,?,?,?,?,0)`
    const encryptPassword = cryptoJS.SHA256(password).toString()
    pool.query(sql,[firstName,lastName,email,encryptPassword,phoneNumber],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    const encryptPassword = cryptoJS.SHA256(password).toString()
    const sql = `SELECT * FROM user WHERE email = ? AND password = ? AND isDeleted = 0;`
    pool.query(sql,[email,encryptPassword],(error,data)=>{
        if(data){
            if(data.length!=0){
                const user = data[0]
                if(user.isDeleted){
                    res.send(result.createErrorResult("Account is closed"))
                }else{
                    const payload = {
                        id:user.id
                    }
                    const token = jwt.sign(payload,config.secret)
                    const userData ={
                        name : user.firstName+" "+user.lastName,
                        token:token
                    }
                    res.send(result.createSuccessResult(userData))
                }
            }else{
                res.send(result.createErrorResult("user does not exist"))
            }
        }else{
            res.send(result.createErrorResult(error))
        }
    })
})

router.put('/profile',(req,res)=>{
    const sql = `update user set firstName = ? ,lastName = ? ,phoneNumber = ? where id = ?`
    pool.query(sql,[req.body.firstName,req.body.lastName,req.body.phoneNumber,req.headers.id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.put('/deleteUser',(req,res)=>{
    const sql = `update user set isDeleted = 1 where id = ?`
    pool.query(sql,[req.headers.id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router