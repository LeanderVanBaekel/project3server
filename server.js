// server.js - tutorial: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
var MongoClient = require('mongodb');
var path        = require('path');


//make a connection with the database
MongoClient.MongoClient, format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/project3db', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});



// global vars (no var declaration)
// ==============================================================================
settingsAlarmTrigger = 5;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    //make sure that people can get and post data by allowing cross origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var port = process.env.PORT || 8080;        // set our port



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res){
    res.render('./index.ejs');   
});

// more routes for our API will happen here
var espRouter = require('./routes/esp');
app.use('/esp', espRouter); 

var alarmRouter = require('./routes/alarm');
app.use('/alarm', alarmRouter);

var averageRouter = require('./routes/average');
app.use('/average', averageRouter);

var activityRouter = require('./routes/activity');
app.use('/activity', activityRouter);

var settingsRouter = require('./routes/settings');
app.use('/settings', settingsRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App running on localhost:' + port);