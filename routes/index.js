// * Imports
const express = require('express');
const planetsRoutes = require('./planetsRoutes');

// * Initialize Router Object
const router = express.Router();

// * Routes
router.use('/', swaggerRoutes);

// * Export Router
module.exports = router;