// * Imports
const express = require('express');
const planetsController = require('../controllers/planetsController.js');
const validate = require('../middleware/validationMiddleware.js');

// * Initialize Router Object
const router = express.Router();

// * Routes
// GET all planets
router.get('/', planetsController.getAllPlanets);

// GET planet by ID
router.get('/:id', planetsController.getPlanetById);

// POST new planet
router.post('/', validate.savePlanet, planetsController.createPlanet);

// PUT replace planet by ID
router.put('/:id', validate.savePlanet, planetsController.replacePlanet);

// PATCH update planet by ID
router.patch('/:id', validate.updatePlanet, planetsController.updatePlanet);

// DELETE planet by ID
router.delete('/:id', planetsController.deletePlanet);

// * Export Router
module.exports = router;