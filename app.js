var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var carsRouter = require("./routes/cars");

var app = express();
var mongo = require("mongodb");

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Vi är uppkopplade mot databasen!");

  const db = client.db("cars");
  app.locals.db = db;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/cars", carsRouter);

module.exports = app;
