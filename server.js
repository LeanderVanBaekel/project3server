// server.js - tutorial: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/project3db', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://api.leandervanbaekel.nl');
// mongoose.connect('mongodb://root:mudkippers8@37.139.27.8:27017');
// console.log(mongoose.connection.readyState);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/esp')
	.get(function(req, res) {
		res.json({message : 'Trying to GET esp data'});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST esp data'});
	});

router.route('/esp/:id')
	.get(function(req, res) {
		var values = req.params.id;
		res.json({message : 'Trying to GET esp data with id: ' + req.params.id});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST esp data with id: ' + req.params.id});
	});

// more routes for our API will happen here
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App running on localhost:' + port);