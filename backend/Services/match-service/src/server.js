const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const cors = require("cors");


const PORT = process.env.PORT || 5001;

app.use(cors());


app.get("/" , (req,res)=>{
    console.log("home end point hit");
    res.send("Hello from the server");
})

app.get("/chat" , (req,res)=>{
    res.send("Hello from the chat server");
})

app.listen(PORT , ()=>{
    console.log(`server running on port : ${PORT}...`);
})