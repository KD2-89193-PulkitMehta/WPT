const express = require('express')
const pool =require('../db/mysql')
const router = express.Router()
const result = require('../utils/util')

router.post('/',(req,res)=>{
    const {categoryId,title,details,address,
        contactNo,ownerName,isLakeView,isTV,isAC,isWifi
        ,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent} = req.body
    const sql = `insert into property(categoryId,title,details,address,
    contactNo,ownerName,isLakeView,isTV,isAC,isWifi
    ,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) 
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    pool.query(sql,[categoryId,title,details,address,
        contactNo,ownerName,isLakeView,isTV,isAC,isWifi
        ,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
router.get('/',(req,res)=>{
    const sql =`select id,title,details,rent,profileImage from property`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get('/propertyId/:id',(req,res)=>{
    const id = req.params.id
    const sql= `select * from property where id = ?`
    pool.query(sql,[id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router