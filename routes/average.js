var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');
var mongoose   = require('mongoose');
var Esp1 = require('../models/esp1.js');
var Esp2 = require('../models/esp2.js');
var Averages = require('../models/average.js');

mongoose.createConnection(url); // connect to our database

router.route('/')
	.get(function(req, res) {
		res.json({message : 'Trying to GET userinput'});
	});


router.route('/day/:esp/:day/:month/:year')
	.get(function(req, res){
		var location = req.params.esp;
		var day = req.params.day;
		var month = req.params.month - 1;
		var year = req.params.year;
		var query;

		var beginDate = new Date(year, month, day, 0, 0, 0);
		var endDate = new Date(year, month, day, 23, 59, 59);

		if(location === 'esp1'){
			query = Esp1.find({
				date: {
					$gte: beginDate,
					$lte: endDate
				}
			});	
		} else if (location === 'esp2'){
			query = Esp2.find({
				date: {
					$gte: beginDate,
					$lte: endDate
				}
			});	
		} else {
			res.json({message : 'Trying to GET userinput'});
			return;
		}

		query.exec(function(err, data){
			res.json(data);
		});


	});

module.exports = router;