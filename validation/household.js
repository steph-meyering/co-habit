const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateHouseholdInput(data) {
  let herrors = {};
  
  data.housename = validText(data.housename) ? data.housename : '';
  
  if (!Validator.isLength(data.housename, { min: 2, max: 30 })) {
    herrors.housename = 'House name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.housename)) {
    herrors.housename = 'House name field is required';
  }

  return {
    herrors,
    hisValid: Object.keys(herrors).length === 0
  };
};