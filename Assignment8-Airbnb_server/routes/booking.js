const express = require('express')
const pool = require('../db/mysql')
const result = require('../utils/util')

const router = express.Router()

router.post('/',(req,res)=>{
    const {userId,propertyId,fromDate,toDate,total} = req.body
    const sql =`insert into bookings(userId,propertyId,fromDate,toDate,total) values(?,?,?,?,?)`
    pool.query(sql,[req.headers.id,propertyId,fromDate,toDate,total],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get('/',(req,res)=>{
    const sql = `select * from bookings`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router