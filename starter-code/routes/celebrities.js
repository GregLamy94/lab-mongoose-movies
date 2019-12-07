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
