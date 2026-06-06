// * Imports
const express = require("express");
const planetsController = require("../controllers/planetsController.js");
const validate = require("../middleware/planetsValidation.js");
const { isAuthenticated } = require("../middleware/authValidation.js");

// * Initialize Router Object
const router = express.Router();

// * Routes
// GET all planets
router.get("/", planetsController.getAllPlanets);

// GET planet by ID
router.get("/:id", validate.verifyPlanetIdFormat, planetsController.getPlanetById);

// POST new planet
router.post("/",
    isAuthenticated,
    validate.verifyAllPlanetFields,
    planetsController.createPlanet
);

// PUT replace planet by ID
router.put("/:id",
    isAuthenticated,
    validate.verifyPlanetIdFormat,
    validate.verifyAllPlanetFields,
    planetsController.replacePlanet
);

// PATCH update planet by ID
router.patch("/:id",
    isAuthenticated,
    validate.verifyPlanetIdFormat,
    validate.verifyUpdatedPlanetFields,
    planetsController.updatePlanet
);

// DELETE planet by ID
router.delete("/:id", isAuthenticated, validate.verifyPlanetIdFormat, planetsController.deletePlanet);

// * Export Router
module.exports = router;
