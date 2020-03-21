const express = require("express");
const Event = require("../../models/Event");
const validateEvent = require("../../validation/event");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the events route" })
);

router.post(
  "/",
  (req, res) => {
    const { errors, isValid } = validateEvent(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      allDay: req.body.allDay,
      start: req.body.start,
      end: req.body.end,
      author: req.body.author,
      household: req.body.household
    });
    newEvent
      .save()
      .then(event => res.json(event))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

router.patch(
  "/:eventId",
  (req, res) => {
    const { errors, isValid } = validateEvent(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Event.findById(req.params.eventId)
      .then(event => {
        event.title = req.body.title;
        event.description = req.body.description;
        event.allDay = req.body.allDay;
        event.start = req.body.start;
        event.end = req.body.end;
        event.save().then(event => res.json(event));
        
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
