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
	for (var i = data.length - 1; i >= 0; i--) {
		motion.push(data[i].pir);

		if (data[i].pir > 0) {
			motionAmount ++;
		}
	};
	if (motionAmount > 15) {
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
    var alarm = new Alarm();
    var date = new Date();
    alarm.location = esp;  
	alarm.day = date.getDate();
    alarm.month = date.getMonth() + 1;
    alarm.year = date.getFullYear();
    alarm.hour = date.getHours();
    alarm.time = date.getHours() + ':' + date.getMinutes();
    alarm.status = null;
    alarm.createdOn = date;

    // save the bear and check for errors
    alarm.save(function(err) {
        if (err)
            res.send(err);

        console.log({ message: 'Alarm created!' + alarm });
    });
};

setInterval(function(){
	getData("esp1");
	getData("esp2");
},10000); 



router.route('/')
	.get(function(req, res) {

	});

module.exports = router;