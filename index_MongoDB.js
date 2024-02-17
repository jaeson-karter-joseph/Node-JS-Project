const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

const studentController = require("./controllers/studentController");

var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send(`<h2>Welcome To DB</h2>
    <h3>Click To Access <b> <a href='/student/list'>database</a></b></h3>`);
});

app.set("views", path.join(__dirname, "/views/"));

app.engine("hbs", {
  defaultLayout: "MainLayout",
  layoutsDir: __dirname + "/views/layouts/",
  handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.set("view engine", "hbs");

app.listen(3000, () => {
  console.log("Listening 3000");
});

app.use("/student", studentController);
