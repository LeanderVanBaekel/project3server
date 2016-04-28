var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var activity  = new Schema({
	location: String,
	value: Number,
    day : Number,
    month : Number,
    year : Number,
    hour : Number,
    time: String,
    status : Boolean
});

module.exports = mongoose.model('Activity', activity);