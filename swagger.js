// * Import the swagger-autogen module
const swaggerAutogen = require("swagger-autogen")();

// * Define the documentation object (optional)
const doc = {
    info: {
        title: "CSE341 Project 2 API: Planetary Data",
        description: "API that provides information about planets in our solar system, including their characteristics, distances from Earth and the Sun, and other interesting facts.",
    },
    host: "cse341-project2-0bia.onrender.com",
    schemes: ["https"],
};

// * Specify the output file and the endpoints files
const outputFile = "./swaggerDoc.json";
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
