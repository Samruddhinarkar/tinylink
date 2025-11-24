const mysql = require('mySql2/promise');
const mySqlPool = mysql.createPool({
    host :"localhost",
    user:"root",
    password:"",
    database:"tinylink",
})

module.exports =mySqlPool;