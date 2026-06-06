// * Imports
const express = require("express");
const solarSystemsController = require("../controllers/solarSystemsController.js");
const validate = require("../middleware/solarSystemsValidation.js");
const { isAuthenticated } = require("../middleware/authValidation.js");

// * Initialize Router Object
const router = express.Router();

// * Routes
// GET all solar systems
router.get("/", solarSystemsController.getAllSolarSystems);

// GET solar system by ID
router.get("/:id", validate.verifySolarSystemId, solarSystemsController.getSolarSystemById);

// POST new solar system
router.post("/",
    isAuthenticated,
    validate.verifyAllSolarSystemFields,
    solarSystemsController.createSolarSystem
);

// PUT replace solar system by ID
router.put("/:id",
    isAuthenticated,
    validate.verifySolarSystemId,
    validate.verifyAllSolarSystemFields,
    solarSystemsController.replaceSolarSystem
);

// PATCH update solar system by ID
router.patch("/:id",
    isAuthenticated,
    validate.verifySolarSystemId,
    validate.verifyUpdatedSolarSystemFields,
    solarSystemsController.updateSolarSystem
);

// DELETE solar system by ID
router.delete("/:id", isAuthenticated, validate.verifySolarSystemId, solarSystemsController.deleteSolarSystem);

// * Export Router
module.exports = router;
