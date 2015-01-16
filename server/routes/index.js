(function() {

 'use strict';
 var express = require('express');
 var router = express.Router();
 var client = require('http');
 var querystring = require('querystring');
 var options = {
	hostname: 'http://www.noserv.com',
	path: '/1/classes/aps',	
	port: 2337,
	headers: {
		"X-Noserv-Application-Id": "rsnq1adhhj90be29fj6pz6dg6zrdlsor", 
		"X-Noserv-REST-API-Key": "txyewqfpjxvwjyviz3sp1vbm3v5qm2t9"
		}
	};	
 
 /* GET home page. */
 router.get('/', function(req, res) {
 		res.render('index');
 });

 router.get('/api/aps', function(req, res) {
	var buffer = '';
	client.get(options, function(result) {
					result.setEncoding('utf8');
					result.on('data', function(chunk) {
						buffer += chunk.toString();	
					});
					result.on('end', function() {
						console.log("result!!!!"); 
						console.log(buffer);
						res.json(buffer);
					});
		});
 });

 router.post('/api/aps', function(req, res) {
	var post_data = querystring.stringify(req.body);
	var post_options = {
		hostname: 'http://www.noserv.com',
		path: '/1/classes/aps?' + post_data,	
		port: 2337,
		method: 'POST',
		headers: {
			"X-Noserv-Application-Id": "rsnq1adhhj90be29fj6pz6dg6zrdlsor", 
			"X-Noserv-REST-API-Key": "txyewqfpjxvwjyviz3sp1vbm3v5qm2t9",
			}
	};	

	console.log(post_data);
	var post_req = client.request(post_options);
	post_req.end();
	
	var buffer = '';
	client.get(options, function(result) {
					result.setEncoding('utf8');
					result.on('data', function(chunk) {
						buffer += chunk.toString();	
					});
					result.on('end', function() {
						console.log("result!!!!"); 
						console.log(buffer);
						res.json(buffer);
					});
		});

	});
	

 router.put('/api/aps', function(req, res) {
/*
		db.aps.update({
			_id: mongojs.ObjectId(req.body._id)
		}, {
			ssid: req.body.ssid,
			password: req.body.password,
			address: req.body.address
		}, {}, function(err, data) {
			res.json(data);
		});  */
	});

	router.delete('/api/aps/:_id', function(req, res) {
/*
		db.aps.remove({
			_id: mongojs.ObjectId(req.params._id)
		}, '', function(err, data) {
			res.json(data);
		}); */
	});
	module.exports = router;

}());
