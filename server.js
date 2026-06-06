// * Imports
const express = require('express');

const dotenv = require('dotenv');

const bodyParser = require('body-parser');

const passport = require('passport');

const session = require('express-session');

// Cors is for handling Cross-Origin Resource Sharing, allowing the server to specify who can access its resources and how they can be accessed. In this code, it is configured to allow requests from any origin and to support various HTTP methods, which is essential for enabling communication between the frontend and backend when they are hosted on different domains or ports.
const cors = require('cors');

const GithubStrategy = require('passport-github2').Strategy;

const authController = require('./controllers/authController.js');

const routes = require('./routes');

const mongodb = require("./data/connect.js");




// * ENV Config and Create Express App
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// * Middleware
app.use(bodyParser.json());

// secret: A random string used to sign the session ID cookie, ensuring its integrity and security. In production, this should be a strong, unique value stored securely (e.g., in environment variables) to prevent unauthorized access to session data.
// resave: Set to false to avoid resaving the session if it hasn't been modified during the request, which can help reduce unnecessary session store operations and improve performance.
// saveUninitialized: Set to false to prevent saving uninitialized sessions (sessions that are new but not modified) to the session store, which can help reduce storage usage and improve performance, especially for users who do not log in or interact with the session.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//
app.use(passport.initialize());

app.use(passport.session());

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

app.use(cors({ methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"] }));

app.use(cors({ origin: "*" }));



// * Routes
app.use(routes);

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await authController.findOrCreateGithubUser(profile);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// this is where we serialize the user data into the session. In this case, we are simply storing the entire user object in the session. This happens at initial login or when the user is authenticated via GitHub, and the resulting user object is stored in the session for later retrieval during subsequent requests.
passport.serializeUser((user, done) => {
    done(null, user);
});

// this is where we deserialize the user data from the session. When a request is made with an active session, Passport will call this function to retrieve the user data from the session and make it available in req.user for the duration of the request. This happens on every request that requires authentication, allowing the server to access the user's information and determine their permissions or access rights based on the stored session data.
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {
    res.send(req.session?.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged out");
});

app.get(
    "/github/callback", passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: false
    }),
    authController.completeGithubLogin
);



// * Global error handling for uncaught exceptions
app.use((err, req, res, next) => {
    console.error("Unhandled request error:", err);
    res.status(500).json({ error: "An unexpected server error ocurred" });
});

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



