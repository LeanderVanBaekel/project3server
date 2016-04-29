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

var dataTime = [];

router.route('/day/:esp/:day/:month/:year')
	.get(function(req, res){
		var location = req.params.esp;
		var day = req.params.day;
		var month = req.params.month - 1;
		var year = req.params.year;
		var query;

		for(hour = 0; hour < 23; hour++){
			var beginDate = new Date(year, month, day, hour);
			var endDate = new Date(year, month, day, hour, 59, 59);

			findByTime(location, beginDate, endDate, hour);
		}
		res.json(dataTime);
	});

router.route('/week/:esp/:day/:month/:year')
	.get(function(req, res){
		var location = req.params.esp;
		var startDay = req.params.day;
		var month = req.params.month - 1;
		var year = req.params.year;
		var query;
		var beginDate = new Date(year, month, startDay, 0, 0);
		var endDate = new Date(year, month, startDay, 23, 59);

		for(day = 0; day < 7; day++){
			if(day !== 0){
				beginDate.setDate(beginDate.getDate() + 1);
				endDate.setDate(endDate.getDate() + 1);	
			}
			findByTime(location, beginDate, endDate, day);
		}
		res.json(dataTime);
	});

router.route('/month/:esp/:month/:year')
	.get(function(req, res){
		var location = req.params.esp;
		var startDay = 1;
		var month = req.params.month - 1;
		var year = req.params.year;
		var query, endDay;
		var beginDate = new Date(year, month, startDay, 0, 0);
		var endDate = new Date(year, month, startDay, 23, 59);

		switch (month) {
			case 0: //janurary
			case 2: //march
		    case 4: //may
		    case 6: //july
		    case 7: //august
		    case 9: //october
		    case 11: //december		    
				endDay = 31;
				break;
		    case 3: //april
		    case 5: //june
		    case 8: //september
		    case 10: //november
		    	endDay = 30;
		    	break;
		    case 1: //febuary
		    	if(year % 4 === 0){
		    		endDay = 29;
		    	} else {
		    		endDay = 28;
		    	}
		    	break;
		}

		for(day = 0; day < endDay; day++){
			beginDate.setDate(beginDate.getDate() + 1);
			endDate.setDate(endDate.getDate() + 1);
			findByTime(location, beginDate, endDate, day);
		}
		res.json(dataTime);
	});

function findByTime(location, begin, end, time){
	if(location === 'esp1'){
		query = Esp1.find({
			date: {
				$gte: begin,
				$lte: end
			}
		});
	} else if (location === 'esp2'){
		query = Esp2.find({
			date: {
				$gte: begin,
				$lte: end
			}
		});	
	} else {
		res.json({message : 'Not a valid location'});
	}

	query.exec(function(err, data){

		if(data.length > 0){

			var pirTotal = 0;
			var length = 0;
			var ldrTotal = 0;
			var soundTotal = 0;
			var averagePir, averageLdr, averageSound;

			data.forEach(function(element, index){
				pirTotal += element.pir;
				ldrTotal += element.ldr;
				soundTotal += element.sound;

				length++;
			});

			averagePir = pirTotal / length;
			averageLdr = ldrTotal / length;
			averageSound = soundTotal / length;


			obj = {
				pir: averagePir,
				ldr: averageLdr,
				sound: averageSound
			};

			dataTime[time] = obj;			
		} else {
			dataTime[time] = {};
		}
	});	
}
module.exports = router;