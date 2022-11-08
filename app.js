// Load Environment
const ENV = {DEV: './.env', PROD: './.env.production'};
const MODE = process.env.ENVIRONMENT || 'dev';
require('dotenv').config({path: ENV[MODE.trim()]});

console.log(`--------- App running on (${MODE.trim()}) Mode ---------`);

// Initial Express App
const express = require('express');
const app = express();

// Cross-origin resource sharing handling
const CORS = require('cors');
app.use(CORS());

// Logger
const logger = require('morgan');
app.use(logger(':remote-addr - [:date] || :method > :url > :status > :response-time ms \n', {
    skip: () => false
}));

// It parses incoming requests with JSON payloads
app.use(express.json());
// It parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));
// Handle public directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


/* --- Routing --- */


// Handle not-found requests
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Not Found!'
    });
});

// Syntax Error or ...
app.use((err, req, res, next) => {
    console.log('-------------------------- Caught exception: ' + err);
    res.status(500).json({
        success: false,
        message: 'Something broke!'
    })
});

// Unknown Errors
process.on('uncaughtException', function (err) {
    console.log('---------ERROR----------------- Caught exception: ' + err);
    process.exit(1);
});

module.exports = app;
