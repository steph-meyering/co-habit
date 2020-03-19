const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
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