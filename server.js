// server.js - tutorial: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

MongoClient.MongoClient, format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/project3db', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res){
  res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

var espRouter = require('./routes/esp');
app.use('/esp', espRouter);

var alarmRouter = require('./routes/alarm');
app.use('/alarm', alarmRouter);

var alarmRouter = require('./routes/alarm');
app.use('/alarm', alarmRouter);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App running on localhost:' + port);