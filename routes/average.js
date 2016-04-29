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

//create a global array where I can save data to
var dataTime = [];

//route to get the averages of the day
router.route('/day/:esp/:day/:month/:year')
	.get(function(req, res){
		//make the url parameters in to variables
		var location = req.params.esp;
		var day = req.params.day;
		//substract 1 from the month to make it fit the javascript date format, where 0 is january
		var month = req.params.month - 1;
		var year = req.params.year;
		var query;

		//for loop that loops over all the ours of the day
		for(hour = 0; hour < 23; hour++){
			var beginDate = new Date(year, month, day, hour);
			var endDate = new Date(year, month, day, hour, 59, 59);

			findByTime(location, beginDate, endDate, hour);
		}
		//return the data found
		res.json(dataTime);
	});

//same format as the above, only with days instead of hours
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
			// if we remove the if statement it skips the day the user put in and starts at the next one
			// ie. enter april 7, data would start at april 8 
			if(day !== 0){
				beginDate.setDate(beginDate.getDate() + 1);
				endDate.setDate(endDate.getDate() + 1);	
			}
			findByTime(location, beginDate, endDate, day);
		}
		res.json(dataTime);
	});

//get averages from a month
router.route('/month/:esp/:month/:year')
	.get(function(req, res){
		var location = req.params.esp;
		//all months start at 1
		var startDay = 1;
		var month = req.params.month - 1;
		var year = req.params.year;
		var query, endDay;
		var beginDate = new Date(year, month, startDay, 0, 0);
		var endDate = new Date(year, month, startDay, 23, 59);

		//switch to see what the end date is of a month
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
		    	if(year % 4 === 0){ //if leap year
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
	//check the location
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

		//if there is data to be found, calculate the average per value
		if(data.length > 0){

			var pirTotal = 0;
			var length = 0;
			var ldrTotal = 0;
			var soundTotal = 0;
			var averagePir, averageLdr, averageSound;

			//loop over all the objects in data array
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