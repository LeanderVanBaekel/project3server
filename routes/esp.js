var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');




router.route('/')
	.get(function(req, res) {
		res.json({message : 'Trying to GET esp data'});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST esp data'});
	});

router.route('/:sensor1/:sensor2/:sensor3')
	.get(function(req, res) {
		var sensor1 = req.params.sensor1;
		var sensor2 = req.params.sensor2;
		var sensor3 = req.params.sensor3;

		//values = values.splice('+');

		var data = {
			"date": new Date(),
			"sensor1" : sensor1,
			"sensor2" : sensor2,
			"sensor3" : sensor3
		};

		MongoClient.connect(url, function(err, db) {
			if (err) {console.error(err);}
			dbFunctions.insertDocument(db, 'esp1', data, function() {
				db.close();
			});
		});

		MongoClient.connect(url, function(err, db) {
			if (err) {console.error(err);}
			dbFunctions.findShit(db, 'esp1', {sensor1: 'hoi'}, function() {
				db.close();
			});
		});

		res.json({message : 'Trying to GET esp data with id: ' + req.params.sensor1});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST esp data with id: ' + req.params.sensor1});
	});

module.exports = router;