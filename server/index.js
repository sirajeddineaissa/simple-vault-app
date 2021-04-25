const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "Vault_App"
});

app.get("/",(req,res)=>{
    res.send("test");
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
