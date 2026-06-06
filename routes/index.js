// * Imports
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController.js');
const authValidation = require('../middleware/authValidation.js');
const planetsRoutes = require('./planetsRoutes.js');
const solarSystemsRoutes = require('./solarSystemsRoutes.js');
const swaggerRoutes = require('./swagger.js');

// * Initialize Router Object
const router = express.Router();

// * Routes

router.use('/', swaggerRoutes);

router.post('/register', authValidation.validateRegistrationFields, authController.registerUser);

router.post('/login', authValidation.validateLoginFields, authController.loginUser);

router.use('/planets', planetsRoutes);

router.use('/solar-systems', solarSystemsRoutes);

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get('/logout', authController.logoutUser);

// * Export Router
module.exports = router;