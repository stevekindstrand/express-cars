var express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
var router = express.Router();

/* GET cars listing. */
router.get("/", function (req, res, next) {
  // $gt - greater than
  // $lt - less than
  // $gte - greater than or equal to
  // $lte - less than or equal to

  req.app.locals.db
    .collection("cars")
    .find({ carYear: { $gte: 1990 } })
    .sort({ carMake: 1 }) // -1 för fallande
    .toArray()
    .then((results) => {
      console.log(results);

      let printCars = "<div><h2>Våra bilar</h2>";

      for (car in results) {
        printCars +=
          "<div>" +
          results[car].carVin +
          " | " +
          results[car].carMake +
          " - " +
          results[car].carModel +
          " (" +
          results[car].carYear +
          ") " +
          results[car].carColor +
          "</div>";
      }

      printCars += "</div>";

      res.send(printCars);
    });

  req.app.locals.db
    .collection("cars")
    // .DeleteOne({ carVin: "5GAKRBED3BJ405273" })
    // .updateOne({ carVin: "5GAKRBED3BJ405273" }, { $set: { carColor: "Black" } })
    // .DeleteMany({ carMake: "GMC" })
    .updateMany({ carMake: "Ford" }, { $set: { carMake: "Fjord" } })
    // .countDocuments()
    .then((results) => {
      console.log(results);
    });
});

router.post("/add", (req, res) => {
  req.app.locals.db
    .collection("cars")
    .insertMany(req.body) //insertOne
    .then((result) => {
      console.log(result);
      res.json({ status: "ok" });
    });
});

module.exports = router;
