var express = require('express');
var router = express.Router();

const request = require('request');
const fakeUa = require('fake-useragent');

/* GET users listing. */

router.get('/', function (req, res, next) {
  const formData = 
  { 
    "term": "netflix.com", 
    "maxresults": 100000, 
    "media": 0, 
    "target": 2, 
    "terminate": [null], 
    "timeout": 200 
  };
  var headers = {
    'Content-Type':'application/json', 
    'User-Agent': fakeUa(),
  };
  request.post({
    headers: headers,
    url: 'https://public.intelx.io/phonebook/search?k=c7ca2255-89d1-4b9f-bc88-97fe781dd631',
    json: formData,
  }, function (err, res, body) {
      console.log('here'); 
      if (err) {
        console.log(err);
        return err;
      }
      else {
        console.log('body',body.id);
      }
  });
});

module.exports = router;
