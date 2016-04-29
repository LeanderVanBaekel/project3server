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
		if (req.body.newVal >= 0 && req.body.newVal <= 10) {
			settingsAlarmTrigger = req.body.newVal;
			res.send("done, new value is: " + settingsAlarmTrigger);
		} else {
			res.send(req.body.newVal + " is not a value between 0 and 10!")
		}

	});

module.exports = router;