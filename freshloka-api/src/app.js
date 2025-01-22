const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoConnect = require('./config/mongo');
const configurePassport = require('./config/passport');
const routes = require('./routes');

const app = express();

// Connect to MongoDB
mongoConnect();

// Passport setup
app.use(passport.initialize());
configurePassport(passport);

// Middleware
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);

module.exports = app;
