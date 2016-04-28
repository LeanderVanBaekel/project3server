var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');
var mongoose   = require('mongoose');
var Alarm = require('../models/alarm.js');
mongoose.createConnection(url); // connect to our database

router.route('/')
	.get(function(req, res) {
		res.json({message : 'Trying to GET userinput'});
	});

module.exports = router;