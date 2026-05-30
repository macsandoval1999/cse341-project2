// * Imports
const mongodb = require("../data/connect.js");
const ObjectId = require("mongodb").ObjectId;

// * Helper functions
// Build solar system object from request body
const buildSolarSystemObject = (source) => ({
    name: source.name,
    primaryStarName: source.primaryStarName,
    starType: source.starType,
    planetarySystemStyle: source.planetarySystemStyle,
    numberOfStars: source.numberOfStars,
    knownPlanetsOrbiting: source.knownPlanetsOrbiting,
    knownDwarfPlanetsOrbiting: source.knownDwarfPlanetsOrbiting,
    distanceFromOurSunLightYears: source.distanceFromOurSunLightYears,
    estimatedAgeBillionYears: source.estimatedAgeBillionYears,
    constellation: source.constellation,
    starMassComparedToSun: source.starMassComparedToSun,
    starRadiusComparedToSun: source.starRadiusComparedToSun,
    starSurfaceTemperatureF: source.starSurfaceTemperatureF,
    hasPotentiallyHabitablePlanet: source.hasPotentiallyHabitablePlanet,
    hasDebrisDisk: source.hasDebrisDisk,
    mostNotableFeatures: source.mostNotableFeatures,
    knownPlanets: source.knownPlanets,
    knownDwarfPlanets: source.knownDwarfPlanets,
    interestingFact: source.interestingFact,
});

// Send Server error response
const sendServerError = (res, err, message) => {
    console.error(message, err);
    res.status(500).json({ error: message });
};

// * Initialize controller object
const solarSystemsController = {};

// * Solar Systems Controller functions
// Get all solar systems
solarSystemsController.getAllSolarSystems = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    try {
        const solarSystems = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .find()
            .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(solarSystems);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve solar systems");
    }
};

// Get solar system by ID
solarSystemsController.getSolarSystemById = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    try {
        const solarSystemId = new ObjectId(req.params.id);
        const solarSystem = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .findOne({ _id: solarSystemId });

        if (!solarSystem) {
            res.status(400).json({ error: "Solar system not found" });
            return;
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(solarSystem);
    } catch (error) {
        sendServerError(res, error, "Failed to retrieve solar system");
    }
};

// Create new solar system
solarSystemsController.createSolarSystem = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Alpha Centauri',
            primaryStarName: 'Alpha Centauri A',
            starType: 'G2V',
            planetarySystemStyle: 'Binary',
            numberOfStars: 2,
            knownPlanetsOrbiting: 2,
            knownDwarfPlanetsOrbiting: 0,
            distanceFromOurSunLightYears: 4.37,
            estimatedAgeBillionYears: 5,
            constellation: 'Centaurus',
            starMassComparedToSun: 1.1,
            starRadiusComparedToSun: 1.2,
            starSurfaceTemperatureF: 5800,
            hasPotentiallyHabitablePlanet: true,
            hasDebrisDisk: false,
            mostNotableFeatures: ['Closest star system to our Sun', 'Binary star system'],
            knownPlanets: ['Proxima Centauri b', 'Alpha Centauri Bb'],
            knownDwarfPlanets: [],
            interestingFact: 'Proxima Centauri b is the closest known exoplanet to Earth'
        }
    } */
    try {
        const newSolarSystem = buildSolarSystemObject(req.body);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .insertOne(newSolarSystem);

        if (response.acknowledged) {
            res.status(200).send({ message: "Solar system created successfully" });
            return;
        }

        res.status(500).json({ error: "Failed to create new solar system" });
    } catch (error) {
        sendServerError(res, error, "Failed to create new solar system");
    }
};

// Replace solar system by ID
solarSystemsController.replaceSolarSystem = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Alpha Centauri',
            primaryStarName: 'Alpha Centauri A',
            starType: 'G2V',
            planetarySystemStyle: 'Binary',
            numberOfStars: 2,
            knownPlanetsOrbiting: 2,
            knownDwarfPlanetsOrbiting: 0,
            distanceFromOurSunLightYears: 4.37,
            estimatedAgeBillionYears: 5,
            constellation: 'Centaurus',
            starMassComparedToSun: 1.1,
            starRadiusComparedToSun: 1.2,
            starSurfaceTemperatureF: 5800,
            hasPotentiallyHabitablePlanet: true,
            hasDebrisDisk: false,
            mostNotableFeatures: ['Closest star system to our Sun', 'Binary star system'],
            knownPlanets: ['Proxima Centauri b', 'Alpha Centauri Bb'],
            knownDwarfPlanets: [],
            interestingFact: 'Proxima Centauri b is the closest known exoplanet to Earth'
        }
    } */
    try {
        const newSolarSystemID = new ObjectId(req.params.id);
        const newSolarSystem = buildSolarSystemObject(req.body);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .replaceOne({ _id: newSolarSystemID }, newSolarSystem);

        if (response.matchedCount === 0) {
            res.status(400).json({ error: "Solar system not found" });
            return;
        }

        res.status(200).send({ message: "Solar system replaced successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to replace existing solar system");
    }
};

// Update solar system by ID
solarSystemsController.updateSolarSystem = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Alpha Centauri',
            primaryStarName: 'Alpha Centauri A',
            starType: 'G2V',
            planetarySystemStyle: 'Binary',
            numberOfStars: 2,
            knownPlanetsOrbiting: 2,
            knownDwarfPlanetsOrbiting: 0,
            distanceFromOurSunLightYears: 4.37,
            estimatedAgeBillionYears: 5,
            constellation: 'Centaurus',
            starMassComparedToSun: 1.1,
            starRadiusComparedToSun: 1.2,
            starSurfaceTemperatureF: 5800,
            hasPotentiallyHabitablePlanet: true,
            hasDebrisDisk: false,
            mostNotableFeatures: ['Closest star system to our Sun', 'Binary star system'],
            knownPlanets: ['Proxima Centauri b', 'Alpha Centauri Bb'],
            knownDwarfPlanets: [],
            interestingFact: 'Proxima Centauri b is the closest known exoplanet to Earth'
        }
    } */
    try {
        const newSolarSystemID = new ObjectId(req.params.id);
        const updatedFields = req.body;
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .updateOne({ _id: newSolarSystemID }, { $set: updatedFields });

        if (response.matchedCount === 0) {
            res.status(400).json({ error: "Solar system not found" });
            return;
        }

        res.status(200).send({ message: "Solar system updated successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to update solar system");
    }
};

// Delete solar system by ID
solarSystemsController.deleteSolarSystem = async (req, res) => {
    //#swagger.tags = ['Solar Systems']
    try {
        const newSolarSystemID = new ObjectId(req.params.id);
        const response = await mongodb.database
            .getDB()
            .db()
            .collection("solarSystems")
            .deleteOne({ _id: newSolarSystemID });

        if (response.deletedCount === 0) {
            res.status(400).json({ error: "Solar system not found" });
            return;
        }

        res.status(200).send({ message: "Solar system deleted successfully" });
    } catch (error) {
        sendServerError(res, error, "Failed to delete solar system");
    }
};

// * Export controller
module.exports = solarSystemsController;
