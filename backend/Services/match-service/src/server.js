const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const User = require("./User.js");
const cors = require("cors");
const AppManager = require("./AppManager.js");
const usersData = require("./UsersData.js");

const PORT = process.env.PORT || 5001;

app.use(cors());

const currUser = new User("a" , 12);

const appManager = new AppManager(currUser , usersData);


app.get("/potentialMatch" , (req,res)=>{

    let pMatch = appManager.findMatch();

    console.log(pMatch);

    res.send(pMatch);
})

app.get("/chat" , (req,res)=>{
    res.send("Hello from the chat server");
})

app.listen(PORT , ()=>{
    console.log(`server running on port : ${PORT}...`);
})