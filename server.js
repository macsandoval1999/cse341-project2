// * Imports
const express = require('express');

const dotenv = require('dotenv');

const bodyParser = require('body-parser');

const routes = require('./routes');

const mondodb = require("./data/connect.js");

// * ENV Config and Create Express App
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// * Middleware
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ error: 'Invalid JSON body' });
        return;
    }
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    next();
});

// * Routes
app.use(routes);

app.use((err, req, res, next) => {
    console.error("Unhandled request error:", err);
    res.status(500).json({ error: "An unexpected server error ocurred" });
});

// * Global error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Caught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});

// * Initialize MongoDB connection then start server
mongodb.database.initDB((err) => {
    if (err) {
        console.error("Failed to initialize database connection:", err);
        process.exit(1);
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});



