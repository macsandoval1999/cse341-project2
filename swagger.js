// * Import the swagger-autogen module
const swaggerAutogen = require("swagger-autogen")();

// * Define the documentation object (optional)
const doc = {
    info: {
        title: "CSE341 Project 2 API",
        description: "API for CSE341 Project 2",
    },
    host: "cse340-web-activity.onrender.com",
    schemes: ["https"],
};

// * Specify the output file and the endpoints files
const outputFile = "./swaggerOutput.json";
const endpointsFiles = ["./routes/index.js"];

// * Generate the swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log("Swagger documentation generated successfully.");
    })
    .catch((error) => {
        console.error("Failed to generate swagger documentation:", error);
        process.exit(1);
    });
