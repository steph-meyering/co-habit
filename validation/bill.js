const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateBillInput(data) {
    let errors = {};
    data.title = validText(data.title) ? data.title : "";

    if (Validator.isEmpty(data.title)) {
        errors.title = "You must specify what this bill is for";
    }
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount must be specified";
    }
    if (!Validator.isCurrency(data.amount)) {
        errors.amount = "The specified amount isn't valid";
    }
    if (Number(data.amount) === 0 ) {
        errors.amount = "The amount cannot be 0$";
    }
    if (Number(data.amount) < 0) {
        errors.amount = "The amount cannot be negative";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}