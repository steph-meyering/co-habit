const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Event = require('../../models/Event');
const Household = require('../../models/Household');

//get all users for a household
router.get('/:id/users', (req, res) => {
  User.find({household: req.params.id})
    .then(users => {
      res.json(users)
    })
    .catch(err =>
      res.status(404).json({ nousersfound: 'No users were found for this household' })
    );
});

//get all events for a household
router.get('/:id/events', (req, res) => {
  Event.find({ household: req.params.id })
    .then(events => {
      res.json(events)
    })
    .catch(err =>
      res.status(404).json({ noeventsfound: 'No events were found for this household' })
  );
});

router.get('/:id/acceptedUsers', (req, res) => {
  User.find({ household: req.params.id, acceptedIntoHousehold: true })
    .then(users => {
      res.json(users);
    })
    .catch(err =>
      res
        .status(404)
        .json({ nousersfound: "No accepted users were found for this household" })
    );
});

router.get('/:id', (req, res) => {
  Household.findById(req.params.id)
    .then(household => {
      res.json(household)
    })
    .catch(err =>
      res.status(404).json({ nohouseholdfound: 'No household found with that ID' })
    );
});

module.exports = router;