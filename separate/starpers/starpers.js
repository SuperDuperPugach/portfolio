/**
 * Created by pugach on 12/03/16.
 */
/**
 * Control module
 * Manage starpers DB. Starpers - peoples (75-100) years old
 */
var async = require('async');//работа с асинхронными потоками
var log4js = require('log4js'); //логгирование


var createNewStarpresDB = require('./starpersDBBuilder');
var Starper = require('./starpersShema').Starper;

var logger = log4js.getLogger();

var controlStarpersDB = function () {

    async.waterfall([
            function checkSizeOfDB(callback) {
                Starper.count({}, function (err, count) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, count);
                });
            },
            function checkDB(count, callback) {
                //TODO проверка нужна нормальная
                if (count === 0) {
                    createNewStarpresDB();
                    return callback(null, 'starpers db created!');
                } else if (count < 200) {
                    Starper.remove({}, function (err) {
                        createNewStarpresDB();
                        return callback(null, 'Starpers db created!');
                    });
                }
            }
        ],
        function (err, resultMsg) {
            if (err) {
                return logger.error('Starpers DB not created. Errors occured!');
            }
            logger.info(resultMsg);
        }
    );
};

module.exports = controlStarpersDB;

