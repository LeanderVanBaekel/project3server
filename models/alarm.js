var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var alarm  = new Schema({
    id : Number,
    date : Date,
    status : Boolean
});

module.exports = mongoose.model('Alarm', alarm);