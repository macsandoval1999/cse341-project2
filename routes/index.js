// * Imports
const express = require('express');
const planetsRoutes = require('./planetsRoutes.js');
const solarSystemsRoutes = require('./solarSystemsRoutes.js');
const swaggerRoutes = require('./swagger.js');

// * Initialize Router Object
const router = express.Router();

// * Routes
router.use('/', swaggerRoutes);

router.get('/', (req, res) => {
    res.send('Welcome to the CSE341 Project 2 API: Planetary Data');
});

router.use('/planets', planetsRoutes);

router.use('/solar-systems', solarSystemsRoutes);

// * Export Router
module.exports = router;