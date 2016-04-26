var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb');
var url = 'mongodb://localhost:27017/project3db';
var dbFunctions = require('../dbfunctions.js');

var data;

var findShit = function(db, collection, query, callback) {
   	var cursor = db.collection(collection).find(query);
   	cursor.each(function(err, doc) {
		if (err) {console.error(err);}
    	if (doc !== null) {
        	console.dir(doc);
        	return doc;
    	} else {
        	callback();
      	}
   });
}

  

router.route('/:id')
	.get(function(req, res) {
		console.log("test");
		var id = req.params.id;
		var data = {};
		MongoClient.connect(url, function(err, db) {
			if (err) {console.error(err);}
			// query id = collection name: esp1 or esp2
			findShit(db, id, {sensor1: 'hoi'}, function() {
				data = doc;
				db.close();
			});
		});

		res.json(data);
	});

router.route('/:id/:sensor1/:sensor2/:sensor3')
	.post(function(req, res) {
		var id = req.params.id;
		var data = {
			"date": new Date(),
			"pir" : req.params.sensor1,
			"ldr" : req.params.sensor2,
			"motion" : req.params.sensor3
		};

		MongoClient.connect(url, function(err, db) {
			if (err)
				console.error(err)

			dbFunctions.insertDocument(db, id, data, function() {
				db.close();
			});
		});

		res.json({message : 'Trying to POST esp data with id: ' + req.params.sensor1});
	});

module.exports = router;