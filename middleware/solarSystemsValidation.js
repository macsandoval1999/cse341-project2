// * Import
const validationHelper = require('../helpers/validationHelper')



// * Validation Middleware Functions
const verifySolarSystemId = (req, res, next) => {
    validationHelper.validateObjectId(req, res, next);
};

// Define the validation rules for creating, and replacing solar system
const verifyAllSolarSystemFields = (req, res, next) => {
    const validationRules = {
        "name": "required|string",
        "primaryStarName": "required|string",
        "starType": "required|string",
        "planetarySystemStyle": "required|string",
        "numberOfStars": "required|numeric",
        "knownPlanetsOrbiting": "required|numeric",
        "knownDwarfPlanetsOrbiting": "required|numeric",
        "distanceFromOurSunLightYears": "required|numeric",
        "estimatedAgeBillionYears": "required|numeric",
        "constellation": "required|string",
        "starMassComparedToSun": "required|numeric",
        "starRadiusComparedToSun": "required|numeric",
        "starSurfaceTemperatureF": "required|numeric",
        "hasPotentiallyHabitablePlanet": "required|boolean",
        "hasDebrisDisk": "required|boolean",
        "mostNotableFeatures": "required|array",
        "knownPlanets": "array",
        "knownDwarfPlanets": "array",
        "interestingFact": "required|string"
    };
    validationHelper.runValidation(req.body, validationRules, res, next);
};

// Define the validation rules for updating solar system (all fields optional but must be valid if provided)
const verifyUpdatedSolarSystemFields = (req, res, next) => {
    const validationRules = {
        name: "string",
        primaryStarName: "string",
        starType: "string",
        planetarySystemStyle: "string",
        numberOfStars: "numeric",
        knownPlanetsOrbiting: "numeric",
        knownDwarfPlanetsOrbiting: "numeric",
        distanceFromOurSunLightYears: "numeric",
        estimatedAgeBillionYears: "numeric",
        constellation: "string",
        starMassComparedToSun: "numeric",
        starRadiusComparedToSun: "numeric",
        starSurfaceTemperatureF: "numeric",
        hasPotentiallyHabitablePlanet: "boolean",
        hasDebrisDisk: "boolean",
        mostNotableFeatures: "array",
        knownPlanets: "array",
        knownDwarfPlanets: "array",
        interestingFact: "string",
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
    verifySolarSystemId,
    verifyAllSolarSystemFields,
    verifyUpdatedSolarSystemFields
};