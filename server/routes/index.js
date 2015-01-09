(function() {

 'use strict';
 var express = require('express');
 var router = express.Router();
 var mongojs = require('mongojs');
 var db = mongojs('meanAps', ['aps']);

 /* GET home page. */
 router.get('/', function(req, res) {
 		res.render('index');
 });

 router.get('/api/aps', function(req, res) {
	 db.aps.find(function(err, data) {
		 res.json(data);
	 });
 });

 router.post('/api/aps', function(req, res) {
	 db.aps.insert(req.body, function(err, data) {
		 res.json(data);
	 });
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
