/**
 * Created by pugach on 23/02/16.
 */
//see starpers.js
var mongoose = require('mongoose');//позволяет взаимодействоать с MongoDB
var log4js = require('log4js'); //логгирование


var logger = log4js.getLogger();
var db = mongoose.connection;
db.on('error', function() {
    logger.error('Can\'t connect to starpers database');
});
mongoose.connect('mongodb://localhost/portfolio');

//Scheme of starpers database
var starpersSchema = mongoose.Schema({
    country:String,
    amount:Number
});
var Starper = mongoose.model('starpers', starpersSchema, 'starpers');
Starper.prototype.addToTotal = function(amount) {
    this.amount += amount;
};


//close connection when ctrl-c
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

exports.mongoose = mongoose;
exports.Starper = Starper;