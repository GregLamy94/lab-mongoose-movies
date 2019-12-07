const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.js");

router.get("/", function(req, res, next) {
  Celebrity.find()
    .then(data => {
      res.render("celebrities/index", { celebrities: data });
    })
    .catch(err => {
      console.error("Error: ", err);
      next(err);
    });
});

router.get("/new", function(req, res, next) {
  res.render("celebrities/new");
});

router.post("/new", function(req, res, next) {
  // const name = req.body.name;
  // const occupation = req.body.occupation;
  // const catchPhrase = req.body.catchPhrase;

  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.redirect("/celebrities/new"));
});

router.post("/:id/delete", function(req, res, next) {
  Celebrity.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      console.log("Celebrity deleted");
      res.redirect("/celebrities");
    })
    .catch(err => next(err));
});

router.get("/:id", function(req, res, next) {
  Celebrity.findOne({ _id: req.params.id })
    .then(data => {
      res.render("celebrities/show", { celebrity: data });
    })
    .catch(error => {
      next(err);
    });
});

module.exports = router;
