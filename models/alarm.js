var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var alarm  = new Schema({
	location: String,
	street: String,
    day : Number,
    month : Number,
    year : Number,
    hour : Number,
    time: String,
    status : Boolean,
    createdOn : Date
});

module.exports = mongoose.model('Alarm', alarm);