var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');
var mongoose   = require('mongoose');
var Esp = require('../models/esp.js');


mongoose.connect(url); // connect to our database

var data;



router.route('/:id')
	.get(function(req, res) {
		console.log("test");
		var id = req.params.id;
		var data = {};

		res.json(data);
	});

router.route('/:id/:sensor1/:sensor2/:sensor3')
	.post(function(req, res) {
		var id = req.params.id;
		if (id == "esp1") {
			var esp = new Esp1();
			esp.date = new Date(),
			esp.pir = Number(req.params.sensor1);
			esp.ldr = Number(req.params.sensor2);
			esp.sound = Number(req.params.sensor3);


			esp.save(function(err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'data saved!!1!' });
	        });

		} else if (id == "esp2") {

			var esp = new Esp2();
			esp.date = new Date(),
			esp.pir = Number(req.params.sensor1);
			esp.ldr = Number(req.params.sensor2);
			esp.sound = Number(req.params.sensor3);

			esp.save(function(err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'data saved!!1!' });
	        });

		} else {
			res.json({message : 'Trying to POST esp data but no esp database '});
		};

		res.json({message : 'Trying to POST esp data with id: ' + req.params.sensor1});
	});

module.exports = router;