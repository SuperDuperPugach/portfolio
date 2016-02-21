/**
 * Created by pugach on 13/02/16.
 */
//Глобальные значеия
const AGE_MIN = 75;
const AGE_MAX = 100;
const API_POPULATION = 'http://api.population.io:80/1.0/population/2016';
const API_COUNTRIES = 'http://api.population.io:80/1.0/countries';

//Подключение модулей
var events = require('events'); //позволяет создавать опрашиваемые события
var request = require("request");//позволяет делать запрос к api
var log4js = require('log4js'); //логгирование
var mongoose = require('mongoose');//позволяет взаимодействоать с MongoDB
var path = require('path');//позоляет билдить пути, запросы
var async = require('async');//работа с асинхронными потоками

//------------------------------------------------------------
//создание объектов, переменных, подключений
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

//TODO ненужен?
var countries = [];


//------------------------------------------------------------
function createNewStarpresDB() {
    return async.waterfall([
        getListOfCounties,                          //1
        function (countries, outerCallback) {       //2
            var getDataFunctions = [];
            for(var i = 0; i < countries.length; i++) {
                getDataFunctions.push(getData(countries[i]));
            }
            outerCallback(null, getDataFunctions);
        },
        function(getDataFunctions, outerCallback) {  //3
            async.parallelLimit(getDataFunctions, 5,
                function(err, results) {
                    logger.debug("Resived data size: " + results.length);
                    if(err) {
                        return outerCallback(err, 'Errors occurred during collecting starpers data')
                    }
                    outerCallback(null, 'Starper\'s data collected successfully');
                }
            );
        }
    ],
        function(err, resultMsg) {               //4
            logger.info(resultMsg);
        });
}











//------------------------------------------------------------

//callback for getting list of
function getListOfCounties(callback) {
    logger.debug('Start getting list of countries');
    request(API_COUNTRIES, function (error, response, body) {
        if(error) {
            logger.error("Errors occurred during getting list of counties");
            callback(error);
        }
        if (!error && response.statusCode == 200) {
            logger.info("List of countries received");
            var parsedBody = JSON.parse(body);
            countries = parsedBody.countries;
            logger.debug("Countris array size: " + countries.length);
            callback(null, countries);

        }
    });
}


//callbak for getting starper's data for one country
function getData(country) {
    return function (callback) {
        var customApi = API_POPULATION + "/" + country;
        var counter = AGE_MAX - AGE_MIN + 1; //счетчик записи поляеных даных в базу
        var starper = new Starper({
            country: country,
            amount: 0
        });
        for(var i = AGE_MIN; i <= AGE_MAX; i++) {
            request(customApi + "/" + i, function(error, response, body) {
                if(error) {
                    //TODO зачекать а не вызывается ли реквест повторно после ошибок
                    logger.error("Errors occurred during getting data for " + country );
                    return callback(error);
                }

                if(!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body);
                    var amount = parsedBody[0].total;
                    starper.addToTotal(amount);
                    counter--;

                }
                if(counter === 0) {
                    logger.debug("Data for" + country + " recieved successfully" );
                    starper.save(function (err) {
                        if (err) {
                            logger.error('Can\'t write data to starpers-db for ' + country);
                            return callback(err);
                        }
                        callback(null, country);
                    });
                }
            });
        }
    }
}




module.exports = createNewStarpresDB;


