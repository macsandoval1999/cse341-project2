// * Import
const validationHelper = require('../helpers/validationHelper')



const verifyPlanetIdFormat = (req, res, next) => {
    validationHelper.validateObjectId(req, res, next);
};

// Define the validation rules for creating planets and replacing planets
const verifyAllPlanetFields = (req, res, next) => {
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
    validationHelper.runValidation(req.body, validationRules, res, next);
};

// Define the validation rules for updating planets (all fields optional but must be valid if provided)
const verifyUpdatedPlanetFields = (req, res, next) => {
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
        res.status(400).send({
            success: false,
            message: "Validation failed",
            errors: { body: ["Request body must include at least one field"] },
        });
        return;
    }
    validationHelper.runValidation(req.body, validationRules, res, next);
};



// * Export
module.exports = {
    verifyPlanetIdFormat,
    verifyAllPlanetFields,
    verifyUpdatedPlanetFields
};