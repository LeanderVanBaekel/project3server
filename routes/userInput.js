var express = require('express');
var router = express.Router();
var fs = require('fs');


//router.get('/', function(req, res, next){

router.route('/')
	.get(function(req, res) {
		res.json({message : 'Trying to GET userinput'});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST userinput'});
	});

router.route('/:id')
	.get(function(req, res) {
		var values = req.params.id;
		res.json({message : 'Trying to GET userinput with id: ' + req.params.id});
	})
	.post(function(req, res) {
		res.json({message : 'Trying to POST userinput with id: ' + req.params.id});
	});



module.exports = router;