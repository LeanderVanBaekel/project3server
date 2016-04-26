var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');
var mongoose   = require('mongoose');
var Alarm = require('../models/alarm.js');
mongoose.connect(url); // connect to our database


//router.get('/', function(req, res, next){

router.route('/')
	.get(function(req, res) {
		res.json({message : 'Trying to GET userinput'});
	});

router.route('/new/:esp')
	.post(function(req, res) {
        
        var alarm = new Alarm();      // create a new instance of the Bear model
        alarm.location = req.params.esp;  // set the bears name (comes from the request)
        alarm.date = new Date();
        alarm.status = null;

        // save the bear and check for errors
        alarm.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Alarm created!' });
        });
        
    });
	// .post(function(req, res) {
	// 	res.json({message : 'Trying to POST userinput'});
	// });

router.route('/update/:id')
    .get(function(req, res){
        var query = Alarm.findOne({ '_id' : req.params.id });

        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/all')
	.get(function(req, res) {
		var values = req.params.id;
		Alarm.find(function(err, alarms) {
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
	});

router.route('/latest')
	.get(function(req, res){
		var query = Alarm.find().sort({date: -1}).limit(1);

		query.exec(function(err, alarms){
			if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
		});
	});

module.exports = router;