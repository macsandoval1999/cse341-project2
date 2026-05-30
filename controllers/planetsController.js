// * Imports
const mongodb = require('../data/connect.js');
const ObjectId = require('mongodb').ObjectId;

// * Helper functions
// Build planet object from request body
const buildPlanetObject = (source) => ({
    name: source.name,
    planetType: source.planetType,
    diameterMiles: source.diameterMiles,
    radiusMiles: source.radiusMiles,
    yearInEarthDays: source.yearInEarthDays,
    dayInEarthHours: source.dayInEarthHours,
    closestDistanceFromEarthMiles: source.closestDistanceFromEarthMiles,
    furthestDistanceFromEarthMiles: source.furthestDistanceFromEarthMiles,
    distanceFromSunMiles: source.distanceFromSunMiles,
    numberOfMoons: source.numberOfMoons,
    gravityComparedToEarth: source.gravityComparedToEarth,
    averageTemperatureF: source.averageTemperatureF,
    atmosphere: source.atmosphere,
    hasRings: source.hasRings,
    orbitalSpeedMph: source.orbitalSpeedMph,
    axialTiltDegrees: source.axialTiltDegrees,
    interestingFact: source.interestingFact
});

// Send server error response
const sendServerError = (res, err, message) => {
    console.error(message, err);
    res.status(500).json({ error: message });
};

// * Initialize controller object
const planetsController = {};

// * Planets Controller functions
// Get all planets
planetsController.getAllPlanets = async (req, res) => {
    //#swagger.tags = ['Planets']
    try {
        const planets = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .find()
            .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(planets);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve planets");
    }
};

// Get planet by ID
planetsController.getPlanetById = async (req, res) => {
    //#swagger.tags = ['Planets']
    try {
        const planetId = new ObjectId(req.params.id);
        const planet = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .findOne({ _id: planetId });

        if (!planet) {
            res.status(400).json({ error: "Planet not found" });
            return;
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(planet);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve planet");
    }
};

// Create new planet
planetsController.createPlanet = async (req, res) => {
    //#swagger.tags = ['Planets']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Earth',
            planetType: 'Terrestrial',
            diameterMiles: 7917,
            radiusMiles: 3959,
            yearInEarthDays: 365.25,
            dayInEarthHours: 24,
            closestDistanceFromEarthMiles: 0,
            furthestDistanceFromEarthMiles: 0,
            distanceFromSunMiles: 92960000,
            numberOfMoons: 1,
            gravityComparedToEarth: 1,
            averageTemperatureF: 59,
            atmosphere: ['Nitrogen', 'Oxygen'],
            hasRings: false,
            orbitalSpeedMph: 67000,
            axialTiltDegrees: 23.5,
            interestingFact: 'Only planet known to support life'
        }
    } */
    try {
        const newPlanet = buildPlanetObject(req.body);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .insertOne(newPlanet);

        if (response.acknowledged) {
            res.status(200).send({ message: "Planet created successfully" });
            return;
        }

        res.status(500).json({ error: "Failed to create new planet" });
    } catch (error) {
        sendServerError(res, error, "Failed to create new planet");
    }
};

// Replace planet by ID
planetsController.replacePlanet = async (req, res) => {
    //#swagger.tags = ['Planets']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Earth',
            planetType: 'Terrestrial',
            diameterMiles: 7917,
            radiusMiles: 3959,
            yearInEarthDays: 365.25,
            dayInEarthHours: 24,
            closestDistanceFromEarthMiles: 0,
            furthestDistanceFromEarthMiles: 0,
            distanceFromSunMiles: 92960000,
            numberOfMoons: 1,
            gravityComparedToEarth: 1,
            averageTemperatureF: 59,
            atmosphere: ['Nitrogen', 'Oxygen'],
            hasRings: false,
            orbitalSpeedMph: 67000,
            axialTiltDegrees: 23.5,
            interestingFact: 'Only planet known to support life'
        }
    } */
    try {
        const newPlanetID = new ObjectId(req.params.id);
        const newPlanet = buildPlanetObject(req.body);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .replaceOne({ _id: newPlanetID }, newPlanet);

        if (response.matchedCount === 0) {
            res.status(400).json({ error: "Planet not found" });
            return;
        }

        res.status(200).send({ message: "Planet replaced successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to replace existing planet");
    }
};

// Update planet by ID
planetsController.updatePlanet = async (req, res) => {
    //#swagger.tags = ['Planets']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Earth',
            planetType: 'Terrestrial',
            diameterMiles: 7917
        }
    } */
    try {
        const newPlanetID = new ObjectId(req.params.id);
        const updatedFields = req.body;
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .updateOne({ _id: newPlanetID }, { $set: updatedFields });

        if (response.matchedCount === 0) {
            res.status(400).json({ error: "Planet not found" });
            return;
        }

        res.status(200).send({ message: "Planet updated successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to update planet");
    }
};

// Delete planet by ID
planetsController.deletePlanet = async (req, res) => {
    //#swagger.tags = ['Planets']
    try {
        const newPlanetID = new ObjectId(req.params.id);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("planets")
            .deleteOne({ _id: newPlanetID });

        if (response.deletedCount === 0) {
            res.status(400).json({ error: "Planet not found" });
            return;
        }

        res.status(200).send({ message: "Planet deleted successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to delete planet");
    }
};

// * Export controller
module.exports = planetsController;