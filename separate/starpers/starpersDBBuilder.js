/**
 * Created by pugach on 13/02/16.
 */
//see starpers.js

//Глобальные значеия
const AGE_MIN = 75;
const AGE_MAX = 100;
const API_POPULATION = 'http://api.population.io:80/1.0/population/2016';
const API_COUNTRIES = 'http://api.population.io:80/1.0/countries';

//Подключение модулей
var events = require('events'); //позволяет создавать опрашиваемые события
var request = require("request");//позволяет делать запрос к api
var log4js = require('log4js'); //логгирование
var path = require('path');//позоляет билдить пути, запросы
var async = require('async');//работа с асинхронными потоками
var Starper = require('./starpersShema').Starper;

//------------------------------------------------------------
//создание объектов, переменных, подключений
var logger = log4js.getLogger();

//внешние функции
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
                    results = results.filter(function (item) { //избавляемся от null
                        return item;
                    });
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



//вспомагательные колбеки
//------------------------------------------------------------

//callback for getting list of
function getListOfCounties(outerCallback) {
    logger.debug('Start getting list of countries');
    request(API_COUNTRIES, function (error, response, body) {
        if(error) {
            logger.error("Errors occurred during getting list of counties");
            return outerCallback(error);
        }
        if (!error && response.statusCode == 200) {
            logger.info("List of countries received");
            var parsedBody = JSON.parse(body);
            var countries = parsedBody.countries;
            countries.pop(); //удаляем элемент World
            logger.debug("Countris array size: " + countries.length);
            outerCallback(null, countries);

        }
    });
}


//callbak for getting starper's data for one country
function getData(country) {
    return function (callback) {
        var customApi = API_POPULATION + "/" + country;
        var counter = AGE_MAX - AGE_MIN + 1; //счетчик записи поляеных даных в базу
        var correctCountry = country; //некоторые страны в неверном формате
        if (country in correctIsoNames) {
            correctCountry = correctIsoNames[country];
        }
        var starper = new Starper({
            country: correctCountry,
            amount: 0
        });
        
        var getYearDataFunctions = [];
        for(var i = AGE_MIN; i <= AGE_MAX; i++) {
            getYearDataFunctions.push(getYearData(customApi + "/" + i, starper));
        }

        async.parallel(getYearDataFunctions, function(err) {
            if (err) {
                logger.error("Errors occurred during getting data for " + country);
                logger.error(err);
                return callback(null, null);
            }
            logger.debug("Data for " + country + " recieved successfully" );
            starper.save(function (err) {
                if (err) {
                    logger.error('Can\'t write data to starpers-db for ' + country);
                    return callback(err);
                }
                callback(null, country);
            });
        });
    }
}

//callbak for getting starper's data for one country for one year
function getYearData(apiURL, starper) {
    return function (callback) {
        request(apiURL, function(error, response, body) {
            if(error) {
                return callback(error);
            }
            if(!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                var amount = parsedBody[0].total;
                starper.addToTotal(amount);
                return callback(null);
            }
        });
    }
}




module.exports = createNewStarpresDB;

var correctIsoNames = {
    'The Bahamas' : "Bahamas",
    'Bolivia' : "Bolivia, Plurinational State of",
    'Cabo Verde' : "Cape Verde",
    'Dem Rep of Congo' : "Congo, the Democratic Republic of the",
    'The Gambia' : "Gambia",
    'West Bank and Gaza' : "Palestine, State of",
    'Hong Kong SAR-China' : "Hong Kong",
    'Islamic Republic of Iran' : "Iran, Islamic Republic of",
    'Cote-d-Ivoire' : "Côte d'Ivoire",
    'Dem Peoples Rep of Korea' : "Korea, Democratic People's Republic of",
    'Rep of Korea' : "Korea, Republic of",
    'Kyrgyz Republic' : "Kyrgyzstan",
    'Lao PDR' : "Lao People's Democratic Republic",
    'Macao SAR China' : "Macao",
    'Moldova' : "Moldova, Republic of",
    'The Netherlands' : "Netherlands",
    'Curacao' : "Curaçao",
    'Federated States of Micronesia' : "Micronesia, Federated States of",
    'Reunion' : "Réunion",
    'St-Lucia' :  "Saint Lucia",
    'St-Vincent and the Grenadines' : "Saint Vincent and the Grenadines",
    'Slovak Republic' : "Slovakia",
    'Vietnam' : "Viet Nam",
    'Syrian Arab Rep' : "Syrian Arab Republic",
    'FYR Macedonia' : "Macedonia, the Former Yugoslav Republic of",
    'Arab Rep of Egypt' : "Egypt",
    'Channel Islands' : 'Channel Islands',
    'Tanzania' : "Tanzania, United Republic of",
    'US Virgin Islands' : "Virgin Islands, U.S.",
    'RB-de-Venezuela' : "Venezuela, Bolivarian Republic of",
    'Rep of Yemen' : "Yemen"
};

