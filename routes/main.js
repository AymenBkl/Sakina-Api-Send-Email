var express = require('express');
var router = express.Router();


const request = require('request');
const fakeUa = require('fake-useragent');

const cors = require('./cors');
/* GET users listing. */

 const nodemailer = require('./nodemailer');
router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .get('/', cors.corsWithOptions, async function (req, response, next) {
    response.sendFile('/views/index.html',{ root: '.' });
  })
  .get('*', cors.corsWithOptions, async function (req, response, next) {
    response.sendFile('/views/index.html',{ root: '.' });
  });





module.exports = router;
