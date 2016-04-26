var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var esp  = new Schema({
    date : Date,
    pir: Number,
    ldr: Number,
    sound: Number
});

module.exports = mongoose.model('Esp1', esp);
module.exports = mongoose.model('Esp2', esp);