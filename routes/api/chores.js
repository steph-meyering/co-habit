const express = require("express");
const router = express.Router();

router.get("/chores", (req, res, next) => {

  Chore.find({}, "action")
    .then(data => res.json(data))
    .catch(next);
});

router.post("/chores", (req, res, next) => {
  if (req.body.action) {
    Chore.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty"
    });
  }
});

router.delete("/chores/:id", (req, res, next) => {
  Chore.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});


module.exports = router;
