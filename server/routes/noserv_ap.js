/**
 * Created by kyunga on 15. 1. 16..
 */
var querystring = require('querystring');
var client = require('http');
var xml2js = require('xml2js');

exports.get_geo = (function(address, callback) {
  var buffer = '';
  var options = {
    hostname: 'openapi.map.naver.com',
    path: '/api/geocode.php?key=6abb24d627bc8cfb0ea8059688de4095&encoding=utf-8&coord=latlng&query=' +
      require('querystring').escape(address)
  };
  var coordinate = {};
  client.get(options, function (result) {
    result.setEncoding('utf8');
    result.on('data', function (chunk) {
      buffer += chunk.toString();
    });

    result.on('end', function () {
      var parser = new xml2js.Parser();
      parser.parseString(buffer, function (err, res) {
        if (res.geocode.item) {
          coordinate.latitude = parseFloat(res.geocode.item[0].point[0].x[0]);
          coordinate.longitude = parseFloat(res.geocode.item[0].point[0].y[0]);
        } else {
          console.log("Invalid address: " + address);
          coordinate.latitude = 0.0;
          coordinate.longitude = 0.0;
        }
        return callback(coordinate);
      });
    });
  });
});

exports.get = (function(req, res) {
  var buffer = '';
  client.get(set_options('GET', '/1/classes/aps', null), function(result) {
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
  var self = this;
  self.get_geo(req.body.address, function(coordinate) {
    var map = set_body(req.body, coordinate);
    var request =
      client.request(set_options('POST', '/1/classes/aps', map), function() {
        self.get(req, res);
      });
    request.write(map);
    request.end();
  });
});

exports.modify = (function(req, res) {
  var self = this;
  self.get_geo(req.body.address, function(coordinate) {
    var map = set_body(req.body, coordinate);
    var request =
      client.request(set_options('PUT', '/1/classes/aps/' + req.body.objectId, map), function() {
        res.json(coordinate);
      });
    request.write(map);
    request.end();
  });
});

exports.delete = (function(req, res) {
  var self = this;
  client.request(set_options('DELETE', '/1/classes/aps/' + req.params._id, null), function() {
    self.get(req, res);
  }).end();
});

function default_option() {
  return  {
    hostname: 'www.noserv.com',
    port: 2337,
    headers: {
      "X-Noserv-Application-Id": "rsnq1adhhj90be29fj6pz6dg6zrdlsor",
      "X-Noserv-REST-API-Key": "txyewqfpjxvwjyviz3sp1vbm3v5qm2t9"
    }
  };
}

function set_options(method, path, body) {
  var options = default_option();
  options.method = method;
  options.path = path;
  options.headers["Content-Type"] = "application/json";
  if (body)
    options.headers["Content-Length"] = Buffer.byteLength(body);
  return options;
}

function set_body(base_body, coordinate){
  var map = base_body;
  map.longitude = coordinate.longitude;
  map.latitude = coordinate.latitude;
  return JSON.stringify(map);
}
