const express =require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const mySqlPool = require("./config/db");
// const categoryRoute = require('./routes/categoryRouter');
// const getsub_categoryRoute = require("./routes/sub_categoryRoute");
const linkRoute = require("./routes/linkRouter")

const app=express();
app.use(bodyParser.json());
app.use(cors());

//routes
// app.use("/api",categoryRoute),

// app.use("/api",getsub_categoryRoute),
app.use("/api",linkRoute)

app.get("/healthz",(req,res)=>{
    res.status(200).json({ "ok": true, "version": "1.0" });
});

//port 
const port=8080;

//contidionaly Listen
mySqlPool
.query("SELECT 1")
.then(()=>{
    app.listen(port,()=>{
        console.log(`server Runninh on Port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
});


//listen
app.listen(port,()=>{
    console.log("server runing")
})