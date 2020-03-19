const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateBillInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : "";
    // data.amount = validText(data.amount) ? data.amount : "";

    // if (!Validator.isFloat(Validator.toFloat(data.amount))){
    //     errors.amount = 'The specified amount is not valid'
    // }

    // if (Validator.isEmpty(data.amount)) {
    //     errors.amount = "Amount must be specified";
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}