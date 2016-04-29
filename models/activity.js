var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var activity  = new Schema({
	location: String,
	street: String,
	value: Number, // activity value 1/10
    day : Number,
    month : Number,
    year : Number,
    hour : Number,
    time: String,
    alarm : Boolean, // true is alarm fired
    createdOn : Date
});

module.exports = mongoose.model('Activity', activity);