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

var dataHours = [];

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
		res.json(dataHours);

	});

function findByTime(location, begin, end, hour){
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
			console.log(data);
			//dataHours.push(data);
			var pirTotal = 0;
			var length = 0;
			var ldrTotal = 0;
			var soundTotal = 0;
			var averagePir, averageLdr, averageSound;

			data.forEach(function(element, index){
				console.log('element pir: '+element.pir);
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

			dataHours[hour] = obj;			
		} else {
			dataHours[hour] = {};
		}



	});	
}
module.exports = router;