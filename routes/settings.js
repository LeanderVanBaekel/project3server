var express = require('express');
var router = express.Router();
var fs = require('fs');

router.route('/')
	.get(function(req, res) {
		var data = {
			title: "Settings",
			req: req,
			settingsAlarmTrigger: settingsAlarmTrigger
		};

		res.render('./settings', {data: data});
	});

router.route('/uploaden')
	.post(function(req, res) {
		res.send("done");
	});

module.exports = router;