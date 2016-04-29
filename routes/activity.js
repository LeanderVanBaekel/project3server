var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');
var mongoose   = require('mongoose');
var Activity = require('../models/activity.js');
var Esp1 = require('../models/esp1.js');
var Esp2 = require('../models/esp2.js');
var Alarm = require('../models/alarm.js');
mongoose.createConnection(url); // connect to our database




// checking how often there was movement in the past 5 min
var checkSuspicion = function(data, esp) {
	var motion = [];
	var motionAmount = 0;
	var activityVal = 0;
	var ldrAverage = 0;
	var soundAverage = 0;

	for (var i = data.length - 1; i >= 0; i--) {
		motion.push(data[i].pir);
		ldrAverage = ldrAverage + data[i].ldr;
		soundAverage = soundAverage + data[i].sound;

		if (data[i].pir > 0) {
			motionAmount ++;
		}
	};

	/////////////////light///////////////////
	
	ldrAverage = ldrAverage / 30;
	ldrAverage = ldrAverage / 100;
	ldrAverage = Math.round(ldrAverage);

	switch(ldrAverage) {	
		case 10:
		case 9:
			activityVal = activityVal + 4;
			break;
		case 8:
		case 7:
			activityVal = activityVal + 2;
			break;
		case 6:
		case 5:
			activityVal = activityVal + 1;
			break;
	}

	////////////////motion///////////////////

	motionAmount = motionAmount / 3;

	switch(motionAmount) {	
		case 10:
		case 9:
			activityVal = activityVal + 4;
			break;
		case 8:
		case 7:
			activityVal = activityVal + 2;
			break;
		case 6:
		case 5:
			activityVal = activityVal + 1;
			break;
	}

	////////////////sound/////////////////


	soundAverage = soundAverage / 30;
	soundAverage = soundAverage / 100;
	soundAverage = Math.round(soundAverage);

	switch(motionAmount) {	
		case 10:
		case 9:
		case 8:
		case 7:
			activityVal = activityVal + 2;
			break;
		case 6:
		case 5:
		case 4:
		case 3:
			activityVal = activityVal + 1;
			break;
	}

	/////////////////////////////////


	var activity = new Activity();
	var date = new Date();
    if (esp == 'esp1') {
        activity.street = 'Voltaplein 53';
        activity.location = 'esp1';  // set the bears name (comes from the request)
    } else {
        activity.street = 'Linnaeusparkweg 101';
        activity.location = 'esp2';
    }
    activity.value = activityVal
	activity.day = date.getDate();
	activity.month = date.getMonth() + 1;
	activity.year = date.getFullYear();
	activity.hour = date.getHours();
	activity.time = date.getHours() + ':' + date.getMinutes();
	if (activityVal > 5) {
        activity.alarm = true;  // set the bears name (comes from the request)
    } else {
        activity.alarm = false;
    }	
    activity.createdOn = new Date();

    activity.save(function(err) {
    	if (err)
    		res.send(err);
    });

	if (activityVal >= settingsAlarmTrigger) {
		ALARM(esp);
	} 
}

// getting data to check for suspicion
var getData = function(esp) {
	var data;

	var query = Esp1.find().sort({date: -1}).limit(30);
	query.exec(function(err, res){
		if (err){
	        res.send(err);
	    }
	    data = res;
	    checkSuspicion(data, esp);
	});
};

// creating new alarm 
var ALARM = function(esp) {
    var alarm = new Alarm();      // create a new instance of the Bear model
    var date = new Date();
    if (esp == 'esp1') {
        alarm.street = 'Voltaplein 53';
        alarm.location = 'esp1';  // set the bears name (comes from the request)
    } else {
        alarm.street = 'Linnaeusparkweg 101';
        alarm.location = 'esp2';
    }
    alarm.day = date.getDate();
    alarm.month = date.getMonth() + 1;
    alarm.year = date.getFullYear();
    alarm.hour = date.getHours();
    alarm.time = date.getHours() + ':' + date.getMinutes();
    alarm.status = null;
    alarm.createdOn = new Date();

    // save the bear and check for errors
    alarm.save(function(err) {
        if (err)
            console.log(err);

        console.log({ message: 'Alarm created!' + alarm });
    });
};

setInterval(function(){
	getData("esp1");
	getData("esp2");
},300000); 



router.route('/day/:day/:month/:year/:esp')
    .get(function(req, res){
        if(req.params.esp === 'esp1' || req.params.esp === 'esp2'){
            var day = req.params.day;
            var month = req.params.month;
            var year = req.params.year;
            var esp = req.params.esp;

            var query = Activity.find({"day": day, "month": month, "year": year, "location": esp});
            query.exec(function(err, data){
                if (err){
                    res.send(err);
                }
                res.json(data);
            });
        } else {
            res.json({ message: 'data not found! ' + req.params.esp + ' is not a valid location'  });
        }	
	});

module.exports = router;




















