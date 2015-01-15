(function() {

 'use strict';
 var express = require('express');
 var router = express.Router();
 var client = require('http');
 var options = {
	hostname: 'http://www.noserv.com',
	path: '/1/classes/aps',	
	port: 2337,
	method: 'GET',
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
	client.get(options, function(result) {
					result.setEncoding('utf8');
					result.on('data', function(chunk) {
						console.log(chunk);
						res.json(chunk);
					});
		});

 });

 router.post('/api/aps', function(req, res) {
		/*client.post(options, JSON.parse(req.body), function(result) {
			done();
		});*/
	});

 router.put('/api/aps', function(req, res) {
		db.aps.update({
			_id: mongojs.ObjectId(req.body._id)
		}, {
			ssid: req.body.ssid,
			password: req.body.password,
			address: req.body.address
		}, {}, function(err, data) {
			res.json(data);
		}); 
	});

	router.delete('/api/aps/:_id', function(req, res) {
		db.aps.remove({
			_id: mongojs.ObjectId(req.params._id)
		}, '', function(err, data) {
			res.json(data);
		});
	});
	module.exports = router;

}());
