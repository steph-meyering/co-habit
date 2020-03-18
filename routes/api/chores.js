const express = require("express");
const Chore = require("../../models/Chore");
const validateChore = require("../../validation/chores");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the chores route" })
);

 // all chores for household
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chore.find({ household: req.user.household })
      .then(chores => res.json(chores))
      .catch(err =>
        res
          .status(404)
          .json({ nochoresfound: "No chores found for that household" })
      );
  }
);

// get chores assigned to user
router.get(
  "/mine",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chore.find({ household: req.user.household, assignedUser: req.user })
      .then(chores => res.json(chores))
      .catch(err =>
        res
          .status(404)
          .json({ nochoresfound: "No chores found for that household" })
      );
  }
);


router.get(
  "/user/:userId",
  (req, res) => {
    Chore.find({ assignedUser: req.params.userId })        
      .then(chores => res.json(chores))
      .catch(err =>
          res.status(404).json({ nochoresfound: 'No chores assigned to that user' }
      ))
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChore(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newChore = new Chore({
      ...req.body,
      author: req.user._id,
      household: req.user.household
    });
    newChore
      .save()
      .then(data => res.json(data))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

router.delete("/:choreId", (req, res, next) => {
  Chore.findOneAndDelete({ _id: req.params.choreId })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
