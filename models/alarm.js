var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var alarm  = new Schema({
    date : Date,
    status : Boolean
});

module.exports = mongoose.model('Alarm', alarm);