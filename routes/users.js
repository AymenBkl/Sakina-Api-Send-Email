var express = require('express');
var router = express.Router();

const request = require('request');
const fakeUa = require('fake-useragent');

const cors = require('./cors');
/* GET users listing. */

router.all('/')
  .options('/',cors.corsWithOptions,function(req,res,next) {
    next();
  })
  .post('/',cors.corsWithOptions, function (req, response, next) {
  console.log(req.body);
  const formData = 
  { 
    "term": req.body.domain, 
    "maxresults": 100000, 
    "media": 0, 
    "target": 2, 
    "terminate": [null], 
    "timeout": 200 
  };
  console.log(formData);
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
        response.statusCode = 500;
        response.json({'err':'Error'});
      }
      else {
        request.get({
          headers: headers,
          url: `https://public.intelx.io/phonebook/search/result?k=c7ca2255-89d1-4b9f-bc88-97fe781dd631&id=${body.id}&limit=${formData.maxresults}`,
        }, function (err, res, body) {
            console.log('here'); 
            if (err) {
              console.log(err);
              response.statusCode = 500;
              response.json({'err':'Error'});
            }
            else {
              response.statusCode = 200;
              response.json({success:true,data:JSON.parse(body)});
            }
        });
        console.log('body',body.id);
      }
  });
});

module.exports = router;
