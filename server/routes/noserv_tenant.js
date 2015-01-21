/**
 * Created by kyunga on 15. 1. 16..
 */
var querystring = require('querystring');
var client = require('http');

exports.login = (function(req, res) {
  var buffer = '';
  client.get(set_options('GET', '/1/login?' + querystring.stringify(req.body)), function(result) {
    result.setEncoding('utf8');
    result.on('data', function(chunk) {
      buffer += chunk.toString();
    });
    result.on('end', function() {
      res.json(buffer);
    });
  });
});

exports.signup = (function(req, res) {
  var self = this;
  client.request(set_options('POST', '/1/users?' + querystring.stringify(req.body)), function() {
    self.get(res);
  }).end();
});

function set_options(method, path) {
  return  {
    hostname: 'www.noserv.com',
    port: 2337,
    method: method,
    path: path,
    headers: {
      "X-Noserv-Application-Id": "rsnq1adhhj90be29fj6pz6dg6zrdlsor",
      "X-Noserv-REST-API-Key": "txyewqfpjxvwjyviz3sp1vbm3v5qm2t9",
      "Content-Type": "application/json"
    }
  };
}