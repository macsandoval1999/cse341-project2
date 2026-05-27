// * Imports
const Validator = require('validatorjs');

// * Validation function
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

// * Export
module.exports = validator;