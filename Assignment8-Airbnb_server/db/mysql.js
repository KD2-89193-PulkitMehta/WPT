const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'KD2-89193-pulkit',
    password:'manager',
    database:'airbnb_db'
})

module.exports = pool