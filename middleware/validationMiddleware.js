// * Import
const validator = require('../helpers/validationHelper')

// * Define the objectId validation rule
const objectIdRule = "regex:/^[0-9a-fA-F]{24}$/";

// * Validation Middleware Functions
const sendValidationError = (res, err) => {
    res.status(412).send({
        success: false,
        message: "Validation failed",
        errors: err,
    });
};

const runValidation = (body, rules, res, next) => {
    validator(body, rules, {}, (err, status) => {
        if (!status) {
            sendValidationError(res, err);
            return;
        }

        next();
    });
};

// * Validation Functions for Planets
const savePlanet = (req, res, next) => {
    const validationRules = {
        name: "required|string",
        planetType: "required|string",
        diameterMiles: "required|numeric",
        radiusMiles: "required|numeric",
        yearInEarthDays: "required|numeric",
        dayInEarthHours: "required|numeric",
        closestDistanceFromEarthMiles: "required|numeric",
        furthestDistanceFromEarthMiles: "required|numeric",
        distanceFromSunMiles: "required|numeric",
        numberOfMoons: "required|numeric",
        gravityComparedToEarth: "required|numeric",
        averageTemperatureF: "required|numeric",
        atmosphere: "required|array",
        hasRings: "required|boolean",
        orbitalSpeedMph: "required|numeric",
        axialTiltDegrees: "required|numeric",
        interestingFact: "required|string"
    };
    runValidation(req.body, validationRules, res, next);
};

const updatePlanet = (req, res, next) => {
    const validationRules = {
        name: "string",
        planetType: "string",
        diameterMiles: "numeric",
        radiusMiles: "numeric",
        yearInEarthDays: "numeric",
        dayInEarthHours: "numeric",
        closestDistanceFromEarthMiles: "numeric",
        furthestDistanceFromEarthMiles: "numeric",
        distanceFromSunMiles: "numeric",
        numberOfMoons: "numeric",
        gravityComparedToEarth: "numeric",
        averageTemperatureF: "numeric",
        atmosphere: "array",
        hasRings: "boolean",
        orbitalSpeedMph: "numeric",
        axialTiltDegrees: "numeric",
        interestingFact: "string"
    };
    if (Object.keys(req.body || {}).length === 0) {
        res.status(412).send({
            success: false,
            message: "Validation failed",
            errors: { body: ["Request body must include at least one field"] },
        });
        return;
    }
    runValidation(req.body, validationRules, res, next);
};

// * Export
module.exports = {
    savePlanet,
    updatePlanet
};