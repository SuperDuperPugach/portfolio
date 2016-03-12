var express = require('express');
var router = express.Router();
var log4js = require('log4js'); //логгирование
var path = require("path");

var Starper = require('../separate/starpers/starpersShema').Starper;


var logger4 = log4js.getLogger();



router.get('/', function(req, res) {
  var projectPath = path.resolve('./');
  res.sendFile(path.join(projectPath, 'public','starpersCard.html'));
});

router.get('/getdata', function(req, res) {
  Starper.find({}, {country:1, amount:1, _id : 0}, getRequestToDBCallback(res));
});

router.get('/getmax/:num', function(req, res) {
  var num = req.params.num;
  Starper
  .find({})
  .limit(num)
  .sort('-amount')
  .select({country:1, amount:1, _id : 0})
  .exec(getRequestToDBCallback(res));
});


module.exports = router;


var getRequestToDBCallback = function (res) {
  return function(err, starpers) {
    if(err) {
    return logger4.error('Can\' get data from starpers database');
    }
    res.json(JSON.stringify(starpers));
  }
};