// const express =require("express");
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const mySqlPool = require("./config/db");
// // const categoryRoute = require('./routes/categoryRouter');
// // const getsub_categoryRoute = require("./routes/sub_categoryRoute");
// const linkRoute = require("./routes/linkRouter")

// const app=express();
// app.use(bodyParser.json());
// app.use(cors());

// //routes
// // app.use("/api",categoryRoute),

// // app.use("/api",getsub_categoryRoute),
// app.use("/api",linkRoute)

// app.get("/healthz",(req,res)=>{
//     res.status(200).json({ "ok": true, "version": "1.0" });
// });

// //port 
// const port=8080;

// //contidionaly Listen
// mySqlPool
// .query("SELECT 1")
// .then(()=>{
//     app.listen(port,()=>{
//         console.log(`server Runninh on Port ${port}`)
//     })
// })
// .catch((error)=>{
//     console.log(error)
// });


// //listen
// app.listen(port,()=>{
//     console.log("server runing")
// })


// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const connectDB = require("./config/db");
// const linkRoute = require("./routes/linkRouter");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// //  Connect to MongoDB
// connectDB();

// //  Routes
// app.use("/api", linkRoute);

// app.get("/healthz", (req, res) => {
//   res.status(200).json({ ok: true, version: "1.0" });
// });

// // ✅Server Start
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const linkRoute = require("./routes/linkRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tinylink")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api", linkRoute);

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
