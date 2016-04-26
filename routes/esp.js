var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';


// function to insert data in esp1 collection
var insertDocument = function(db, data, callback) {
	db.collection('esp1').insertOne( data, function(err, result) {
		if (err) {console.error(err);}
		
		console.log("Inserted a document into the esp1 collection.");
		callback();
	});
};

// function to find data from db
var findShit = function(db, callback) {
   var cursor = db.collection('esp1').find( );
   cursor.each(function(err, doc) {
		if (err) {console.error(err);}
    	if (doc != null) {
        	console.dir(doc);
    	} else {
        	callback();
      	}
   });
};


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
		}

		MongoClient.connect(url, function(err, db) {
			if (err) {console.error(err);}
			insertDocument(db, data, function() {
				db.close();
			});
		});

		MongoClient.connect(url, function(err, db) {
			if (err) {console.error(err);}
			findShit(db, function() {
				db.close();
			});
		});

		res.json({message : 'Trying to GET esp data with id: ' + req.params.id});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST esp data with id: ' + req.params.id});
	});



module.exports = router;