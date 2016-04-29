var express = require('express');
var router = express.Router();
var fs = require('fs');

router.route('/')
	.get(function(req, res) {
		var data = {
			title: "hoi"
		};

		res.render('./settings', {data: data});
	});

module.exports = router;