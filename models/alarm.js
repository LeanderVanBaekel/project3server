var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var alarm  = new Schema({
	location: String,
    date : Date,
    status : Boolean
});

module.exports = mongoose.model('Alarm', alarm);