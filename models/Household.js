const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseholdSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Household = mongoose.model('Household', HouseholdSchema);