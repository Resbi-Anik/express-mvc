const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const app = express();

const port = 3000;

app.use(express.json());

app.use(bodyparser.json(), bodyparser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mvc_api'
})

connection.connect((err)=>{
  if(!err){
    console.log('connection successful');
  }
  else{
    throw err;
  }
});

app.get("/user",(req,res)=>{
  connection.query("SELECT * FROM user",(err,result)=>{
    if(!err){
      res.send(result);
    }
    else{
      res.status(404).send('not found')
    }
  })
})

app.get("/user/:id",(req,res)=>{
  connection.query("SELECT * FROM user WHERE id=?",[req.params.id],(err,result)=>{
    if(!err){
      res.send(result);
    }
    else{
      res.status(404).send('not found')
    }
  })
})

app.post("/user", (req, res) => {
  connection.query(
    "INSERT INTO user (name,id) VALUES (? , ?)",
    [req.body.name, req.body.id],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.status(402).send("not inserted");
      }
    }
  );
});

app.put("/user/:id", (req, res) => {
  connection.query(
    "UPDATE user SET name=? WHERE id=?",
    [req.body.name, req.params.id],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.status(402).send("not inserted");
      }
    }
  );
});

app.delete("/user/:id", (req, res) => {
  connection.query(
    "DELETE FROM user WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.status(402).send("delete successfully");
      }
    }
  );
  courses = removeCourse;
});

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});