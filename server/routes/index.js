(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var noserv_ap = require('./noserv_ap');
  var noserv_tenant = require('./noserv_tenant');

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/login', function(req, res) {
    noserv_tenant.login(req, res);
  });

  router.get('/api/aps', function(req, res) {
    noserv_ap.get(res);
  });

  router.post('/api/aps', function(req, res) {
    noserv_ap.post(req, res);
  });

  router.put('/api/aps', function(req, res) {
    noserv_ap.update(req, res);
  });

  router.delete('/api/aps/:_id', function(req, res) {
    noserv_ap.delete(req, res);
  });

  module.exports = router;

}());
