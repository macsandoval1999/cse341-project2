// * Import the swagger-autogen module
const swaggerAutogen = require("swagger-autogen")();

// * Define the documentation object (optional)
const doc = {
    info: {
        title: "CSE341 Project 2 API: Interstellar Data",
        description: "API that provides data for two interstellar topics: planets, and solar systems! Planets provide planetary information about our solar system, including their characteristics, distances from Earth and the Sun, and other interesting facts. Solar systems provide information about various solar systems in our galaxy, including their primary star, number of stars, known planets and dwarf planets orbiting, distance from our sun, and other interesting facts.",
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
