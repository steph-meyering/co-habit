const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Household = require('../../models/Household');

router.get('/:id', (req, res) => {
  console.log("hi there")
  Household.findById(req.params.id)
    .then(household => {
      res.json(household)
    })
    .catch(err =>
      res.status(404).json({ nohouseholdfound: 'No household found with that ID' })
    );
});

module.exports = router;