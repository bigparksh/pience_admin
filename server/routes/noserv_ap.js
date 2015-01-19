/**
 * Created by kyunga on 15. 1. 16..
 */
var querystring = require('querystring');
var client = require('http');

exports.get = (function(res) {
  var options = get_options();
  options.method = 'GET';
  options.path = '/1/classes/aps';

  var buffer = '';
  client.get(options, function(result) {
    result.setEncoding('utf8');
    result.on('data', function(chunk) {
      buffer += chunk.toString();
    });
    result.on('end', function() {
      res.json(buffer);
    });
  });
});

exports.post = (function(req, res) {
  var options = get_options();
  options.method = 'POST';
  options.path = '/1/classes/aps?' + querystring.stringify(req.body);
  var self = this;
  client.request(options, function() {
    self.get(res);
  }).end();
});

exports.update = (function(req, res) {
  var options = get_options();
  var put_body = JSON.stringify(req.body);

  options.path = '/1/classes/aps/' + req.body.objectId;
  options.method = 'PUT';
  options.headers["Content-Type"] = "application/json";
  options.headers["Content-Length"] = Buffer.byteLength(put_body);
  var put_req = client.request(options, function(result) {
    result.on('data', function() {
      check_response(result.statusCode, res);
    });
  });

  put_req.write(put_body);
  put_req.end();
});

exports.delete = (function(req, res) {
  var options = get_options();
  options.path = '/1/classes/aps/' + req.params._id;
  options.method = 'DELETE';
  options.headers["Content-Type"] = "application/json";

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