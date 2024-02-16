const express = require("express");
const mysql = require("mysql");

//Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//Connect to MySql
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("DataBase Created");
  });
});

//Create Table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("EMPLOYEE TABLE CREATED");
  });
});

//Insert Employee
app.get("/employee1", (req, res) => {
  let post = { name: "Jaeson", designation: "SDE" };
  let sql = "INSERT INTO employee SET ?";
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee Added");
  });
});

//Select ALL Employee
app.get("/getemployee", (req, res) => {
  let sql = "SELECT * FROM employee";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee Details FetchedF");
  });
});

//Update An Employee
app.get("/updateEmployee1/:id", (req, res) => {
  let sql = `UPDATE employee SET name = '${"Joseph"}' WHERE id = ${
    req.params.id
  }  `;

  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee Updated");
  });
});

//Delete Record
app.get("/deleteEmployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Deleted!");
  });
});

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
