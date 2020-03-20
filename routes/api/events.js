const express = require("express");
const Event = require("../../models/Event");
const validateEvent = require("../../validation/event");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the events route" })
);

// all events for household
router.get(
  "/:householdId/events",
  (req, res) => {
    Event.find({ household: req.params.householdId })
      .then(events => res.json(events))
      .catch(err =>
        res
          .status(404)
          .json({ noeventsfound: "No events found for that household" })
      );
  }
);

router.post(
  "/",
  (req, res) => {
    const { errors, isValid } = validateEvent(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newEvent = new Event({
      ...req.body,
      author: req.user._id,
      household: req.user.household
    });
    newEvent
      .save()
      .then(data => res.json(data))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

router.patch(
  "/:eventId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEvent({...req.body,
    //   author: req.user._id,
    //   household: req.user.household});

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    Event.findById(req.param.eventId)
      .then(event => {
        event.title = req.body.title;
        event.description = req.body.description;
        event.start = req.body.start;
        event.end = req.body.end;
        event.save();
      })
      .catch(err => res.status(400).json("Error: " + err));
  }
);

router.delete("/:eventId", (req, res) => {
  Event.findOneAndDelete({ _id: req.params.eventId })
    .then(data => res.json(data))
    .catch(err =>
      res.status(404).json({ noeventsfound: "No events found with that id" })
    );
});

module.exports = router;
