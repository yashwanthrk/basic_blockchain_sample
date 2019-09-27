const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/datastore');
const UTIL = require('./app/util');


const app = express();

mongoose.connect(config.db)
let db = mongoose.connection;
mongoose.set('debug', true);
db.on('error', function () {
    // throw new Error('unable to connect to database at ' + config.db);
    console.log(config.db)
});



// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
/** block routes */
app.use('/', require('./app/routes/BlockRoute'));


// add blocks to DB on start of app
UTIL.storeBlocks();


// Start the server
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});


module.exports = app;