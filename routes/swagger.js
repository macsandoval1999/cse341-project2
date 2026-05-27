// * Import the necessary modules
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swaggerDoc.json");

// * Set up the Swagger UI route
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// * Export the router
module.exports = router;
