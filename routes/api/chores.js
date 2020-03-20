const express = require("express");
const Chore = require("../../models/Chore");
const validateChore = require("../../validation/chores");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
import moment from "moment";
mongoose.set("useFindAndModify", false);

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

router.get("/user/:userId", (req, res) => {
  Chore.find({ assignedUser: req.params.userId })
    .then(chores => res.json(chores))
    .catch(err =>
      res.status(404).json({ nochoresfound: "No chores assigned to that user" })
    );
});

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

    // add second due date if chore is recurring
    if (req.body.reccuring !== "never") {
      let nextDate;
      // space due dates based on recurring input
      switch (req.body.reccuring) {
        case "daily":
          nextDate = moment(newChore.dueDate).add(1, "day")
        case "weekly":
          nextDate = moment(newChore.dueDate).add(7, "days")
        case "biweekly":
          nextDate = moment(newChore.dueDate).add(14, "days")
        default:
          break;
      }

      newChore.dueDate.push(nextDate)
    }

    newChore
      .save()
      .then(data => res.json(data))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

router.patch(
  "/:choreId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChore({
      ...req.body,
      household: req.user.household
    });

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Chore.findByIdAndUpdate(
      req.params.choreId,
      req.body,
      { new: true },
      (err, data) => {
        if (data) return res.json(data);
        if (err) return res.status(400).json("Error: " + err);
      }
    );
  }
);

router.delete("/:choreId", (req, res) => {
  Chore.findByIdAndRemove(req.params.choreId, (err, chore) => {
    if (err)
      return res
        .status(404)
        .json({ nochoresfound: "No chores found with that id" });
    return res.json(chore._id);
  });
});

module.exports = router;
