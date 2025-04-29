const express = require('express')
const pool = require('../db/mysql')
const multer = require('multer')
const upload  = multer({dest : "images"})
const router = express.Router()
const result = require('../utils/util')

router.use(express.static("./images"))
router.get('/',(req,res)=>{
    const sql = `select id,title,details,image from category`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.post('/',upload.single('icon'),(req,res)=>{
    const {title,details} = req.body
    const sql =`insert into category(title,details,image) values(?,?,?)`
    pool.query(sql,[title,details,req.file.filename],(error,data)=>{
        if(data){
            res.send(result.createSuccessResult(data))
        }else{
            res.send(result.createErrorResult(error))
        }
    })
})

module.exports = router