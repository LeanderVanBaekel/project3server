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

router.route('/:id')
    .get(function(req, res) {
        var query = Alarm.find({"_id": req.params.id});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });


router.route('/new/:esp')
	.post(function(req, res) {
        
        var alarm = new Alarm();      // create a new instance of the Bear model
        var date = new Date();
        alarm.location = req.params.esp;  // set the bears name (comes from the request)
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

            res.json({ message: 'Alarm created!' + alarm });
        });
        
    });
	// .post(function(req, res) {
	// 	res.json({message : 'Trying to POST userinput'});
	// });


router.route('/update/:id/:value')
    .get(function(req, res){
        var value = req.params.value;

        if(value == 'true'){
            Alarm.update(
                { '_id': req.params.id  },
                { $set: { "status": true } }
            );
            res.json('Alarm ' + req.params.id + ' updated with status: true');   
        } else if (value == 'false'){
            Alarm.update(
                { '_id': req.params.id  },
                { $set: { "status": false } }
            );
            res.json('Alarm ' + req.params.id + ' updated with status: false');
        } else if (value == 'null'){
            Alarm.update(
                { '_id': req.params.id  },
                { $set: { "status": null } }
            );
            res.json('Alarm ' + req.params.id + ' updated with status: null');
        } else {            
            res.json('Not a valid value. Alarm not updated');
        }
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
		var query = Alarm.find().sort({createdOn: -1}).limit(1);

		query.exec(function(err, alarms){
			if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
		});
	});

router.route('/day/:day/:month/:year')
    .get(function(req, res){
        var day = req.params.day;
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"day": day, "month": month, "year": year});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/day/:day/:month/:year/esp1')
    .get(function(req, res){
        var day = req.params.day;
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"day": day, "month": month, "year": year, location: 'esp1'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/day/:day/:month/:year/esp2')
    .get(function(req, res){
        var day = req.params.day;
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"day": day, "month": month, "year": year, location: 'esp2'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/month/:month/:year')
    .get(function(req, res){
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"month": month, "year": year});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/month/:month/:year/esp1')
    .get(function(req, res){
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"month": month, "year": year, location: 'esp1'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });


router.route('/month/:month/:year/esp2')
    .get(function(req, res){
        var month = req.params.month;
        var year = req.params.year;

        var query = Alarm.find({"month": month, "year": year, location: 'esp2'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/year/:year')
    .get(function(req, res){
        var year = req.params.year;

        var query = Alarm.find({"year": year});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });
    
router.route('/year/:year/esp1')
    .get(function(req, res){
        var year = req.params.year;

        var query = Alarm.find({"year": year, location: 'esp1'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

router.route('/year/:year/esp2')
    .get(function(req, res){
        var year = req.params.year;

        var query = Alarm.find({"year": year, location: 'esp2'});
        query.exec(function(err, alarms){
            if (err){
                res.send(err);
            }

            console.log(alarms);
            res.json(alarms);
        });
    });

module.exports = router;