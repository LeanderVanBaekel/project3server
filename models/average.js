var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var average  = new Schema({
	location: String,
    time: String,
    Average: {
        ldr: Number,
        sound: Number,
        pir: Number
    },
    DetailedAverage : [{
        ldr: Number,
        sound: Number,
        pir: Number
    }]
});

module.exports = mongoose.model('Average', average);