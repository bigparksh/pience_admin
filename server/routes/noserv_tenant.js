/**
 * Created by kyunga on 15. 1. 16..
 */
var querystring = require('querystring');
var client = require('http');

exports.login = (function(req, res) {
  var options = get_options();
  options.method = 'GET';
  options.path = '/1/login?' + querystring.stringify(req.body);

  console.log(options.path);
  var buffer = '';
  client.get(options, function(result) {
    result.setEncoding('utf8');
    result.on('data', function(chunk) {
      buffer += chunk.toString();
      console.log(buffer);

    });
    result.on('end', function() {
      res.render('index');
    });
  });
});

exports.signup = (function(req, res) {
  var options = get_options();
  options.method = 'POST';
  options.headers["Content-Type"] = "application/json";
  options.path = '/1/users?' + querystring.stringify(req.body);
  var self = this;
  client.request(options, function() {
    self.get(res);
  }).end();
});

function check_response(status_code, res) {
  if(status_code == "200")
    res.json("success");
  else
    res.json("fail");
}

function get_options() {
  return  {
    hostname: 'www.noserv.com',
    port: 2337,
    headers: {
      "X-Noserv-Application-Id": "rsnq1adhhj90be29fj6pz6dg6zrdlsor",
      "X-Noserv-REST-API-Key": "txyewqfpjxvwjyviz3sp1vbm3v5qm2t9"
    }
  };
}