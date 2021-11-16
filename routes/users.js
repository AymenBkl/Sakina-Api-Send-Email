var express = require('express');
var router = express.Router();

const request = require('request');
const fakeUa = require('fake-useragent');

const cors = require('./cors');
/* GET users listing. */

router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .post('/', cors.corsWithOptions, function (req, response, next) {
    console.log(req.body);
    response.statusCode = 200;
    response.json({success:true,msg:'Sent'});
  });

module.exports = router;
