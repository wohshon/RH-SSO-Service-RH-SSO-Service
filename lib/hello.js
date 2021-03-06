var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function rhssoRoute() {
  var rhsso = new express.Router();
  rhsso.use(cors());
  rhsso.use(bodyParser());



  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  rhsso.post('/', function(req, res) {
/*
    client_secret: '6262a2e9-c0ca-4368-bd09-c4de9ee4610d',
    client_id: 'demo-rest',
    username: 'jim',
    password: 'jboss.1234' }
*/

    //var url = "http://192.168.223.130:8080/auth/realms/demo/protocol/openid-connect/token";
    var url = "https://secure-sso-wohshon.44fs.preview.openshiftapps.com/auth/realms/demo/protocol/openid-connect/token";

    request({
      json : true,
      method: 'post',
      form: {
         //grant_type: 'client_credentials',
         //client_secret: '58b4d99f-a5d7-471c-b500-9fb91d73b6da',
         grant_type: 'password',
         client_id: 'demo-rest-public',
         username: req.body.uname,
         password: req.body.upassword
      } ,     
      url : url
    }, function(err, response, body){
      if (err || !body){
        return res.status(500).json(err || "No token found");
      }
      console.log(body);
      console.log("ACCESS_TOKEN");
      var token=JSON.parse(JSON.stringify(body));
      if (token.access_token) {
        console.log(token.access_token);
        return res.json({access_token: token.access_token});
      } else 
      return res.json({access_token: token});
    });    
  });
  return rhsso;
}

module.exports = rhssoRoute;
