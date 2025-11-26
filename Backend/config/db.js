// const mysql = require('mySql2/promise');
// const mySqlPool = mysql.createPool({
//     host :"localhost",
//     user:"root",
//     password:"",
//     database:"tinylink",
// })

// module.exports =mySqlPool;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
