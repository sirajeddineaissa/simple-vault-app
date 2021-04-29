const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./encryption");

const app = express();
app.use(cors());
app.use(express.json());    
const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "Vault_App"
});

app.post("/addpassword", (req,res) => {
    const {password,service} = req.body;
    const enc = encrypt(password);
    db.query(
      "INSERT INTO passwords (password,service,iv) VALUES (?,?,?)",
      [enc.password,service,enc.iv],
      (err,result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Success");
        }
      }
    );
  });

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});
